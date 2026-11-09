"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, LogOut, Loader2 } from "lucide-react";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: "draft" | "published";
  read_time: number | null;
  published_at: string | null;
};

type FormState = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: "draft" | "published";
  read_time: number;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  status: "draft",
  read_time: 5,
};

function getClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export default function AdminPage() {
  const [supabase] = useState(getClient);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<PostRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<PostRow | null>(null);

  const loadPosts = useCallback(
    async (accessToken: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts?status=draft&limit=50", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error((await res.json()).error ?? "Failed to load");
        const data = await res.json();
        setPosts(data.items);
        setError("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load posts");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      setToken(session?.access_token ?? null);
      setChecking(false);
      if (session?.access_token) await loadPosts(session.access_token);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setToken(session?.access_token ?? null);
      if (session?.access_token) loadPosts(session.access_token);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase, loadPosts]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setSigningIn(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSigningIn(false);
    if (err) setError(err.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setPosts([]);
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setEditorOpen(true);
  }

  function openEdit(p: PostRow) {
    setEditing(p);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      cover_image: p.cover_image ?? "",
      status: p.status,
      read_time: p.read_time ?? 5,
    });
    setEditorOpen(true);
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        cover_image: form.cover_image || null,
        read_time: Number(form.read_time) || null,
      };
      const res = await fetch(editing ? `/api/posts/${editing.id}` : "/api/posts", {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg =
          typeof data.details === "object" && data.details
            ? JSON.stringify(data.details)
            : (data.error ?? "Save failed");
        throw new Error(msg);
      }
      setEditorOpen(false);
      await loadPosts(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget || !token) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/posts/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Delete failed");
      setDeleteTarget(null);
      await loadPosts(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-coral-400" aria-label="Loading" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={signIn}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-8"
        >
          <h1 className="font-heading text-2xl font-bold">
            Tactyqal <span className="text-gradient">Admin</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to manage blog posts.</p>

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={signingIn}
            className="mt-6 w-full rounded-full bg-coral-500 font-semibold text-navy hover:bg-coral-400"
          >
            {signingIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Sign in
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 md:pt-28">
      <div className="container-x max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl">
              Blog <span className="text-gradient">Admin</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={openCreate}
              className="rounded-full bg-coral-500 font-semibold text-navy hover:bg-coral-400"
            >
              <Plus className="mr-1.5 h-4 w-4" aria-hidden /> New post
            </Button>
            <Button
              variant="outline"
              onClick={signOut}
              className="rounded-full border-white/15 bg-transparent"
            >
              <LogOut className="mr-1.5 h-4 w-4" aria-hidden /> Sign out
            </Button>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                    No posts yet. Create your first one.
                  </td>
                </tr>
              )}
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-200">{p.title}</p>
                    <p className="text-xs text-slate-500">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        p.status === "published"
                          ? "bg-coral-500/15 text-coral-300"
                          : "bg-slate-500/20 text-slate-300"
                      }
                    >
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {p.published_at
                      ? new Date(p.published_at).toLocaleDateString("en-GB")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(p)}
                        aria-label={`Edit ${p.title}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(p)}
                        aria-label={`Delete ${p.title}`}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / edit dialog */}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#101828] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit post" : "New post"}</DialogTitle>
            <DialogDescription>
              Posts are served through the REST API at /api/posts.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={savePost} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="f-title">Title</Label>
                <Input
                  id="f-title"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: editing
                        ? form.slug
                        : e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, ""),
                    })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="f-slug">Slug</Label>
                <Input
                  id="f-slug"
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="f-excerpt">Excerpt</Label>
              <Textarea
                id="f-excerpt"
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="f-content">Content (Markdown)</Label>
              <Textarea
                id="f-content"
                rows={10}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="mt-1.5 font-mono text-xs"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="f-cover">Cover image URL</Label>
                <Input
                  id="f-cover"
                  type="url"
                  value={form.cover_image}
                  onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                  className="mt-1.5"
                  placeholder="https://…"
                />
              </div>
              <div>
                <Label htmlFor="f-read">Read time (min)</Label>
                <Input
                  id="f-read"
                  type="number"
                  min={1}
                  max={120}
                  value={form.read_time}
                  onChange={(e) =>
                    setForm({ ...form, read_time: Number(e.target.value) })
                  }
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm({ ...form, status: v as "draft" | "published" })
                  }
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditorOpen(false)}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="rounded-full bg-coral-500 font-semibold text-navy hover:bg-coral-400"
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
                {editing ? "Save changes" : "Create post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent className="border-white/10 bg-[#101828] sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete post?</DialogTitle>
            <DialogDescription>
              “{deleteTarget?.title}” will be permanently removed. This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={saving}
              className="rounded-full bg-red-500 font-semibold text-white hover:bg-red-400"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
