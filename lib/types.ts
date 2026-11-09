export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author_id: string | null;
  category_id: string | null;
  status: PostStatus;
  read_time: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostListItem = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "cover_image" | "status" | "read_time" | "published_at"
>;

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  category_id?: string | null;
  status: PostStatus;
  read_time?: number | null;
  published_at?: string | null;
};
