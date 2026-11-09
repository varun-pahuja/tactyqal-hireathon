export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "The Journey", href: "#program" },
  { label: "Shipped Apps", href: "#stories" },
  { label: "Find Your Idea", href: "#quiz" },
  { label: "Why Us", href: "#why" },
  { label: "Blog", href: "#blog" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const heroStats = [
  { value: 100, suffix: "+", label: "Students Mentored" },
  { value: 50, suffix: "+", label: "Top University Admissions" },
  { value: 1000, suffix: "+", label: "People Impacted" },
];

export const heroBullets = [
  "1:1 Mentoring",
  "Idea To Full-Stack App",
  "No Coding",
  "Admissions To The Best Colleges",
  "Grants",
  "Media Coverage",
];

export type Story = {
  name: string;
  description: string;
  image: string;
};

export const stories: Story[] = [
  {
    name: "KrishiDrishti",
    description:
      "AI-powered soil analysis & crop recommendation app that can impact millions of local farmers in India.",
    image: "https://www.tactyqal.com/application/assets/img/apps/krishidrishti1.png",
  },
  {
    name: "Elenor Vegan Handbags",
    description:
      "Corporate gifting platform that sells vegan handbags, started by a 16 year old and generated INR 9,000 in the first week.",
    image: "https://www.tactyqal.com/application/assets/img/apps/elenor1.png",
  },
  {
    name: "One Last Chapter",
    description:
      "Book subscription service for kids. Started by a 13-year old and is generating INR 100,000 month revenue.",
    image: "https://www.tactyqal.com/application/assets/img/apps/olc1.png",
  },
  {
    name: "Paws of Promise",
    description:
      "App for virtual pet adoption that connects pet lovers with pets from shelters.",
    image: "https://www.tactyqal.com/application/assets/img/apps/pop1.png",
  },
  {
    name: "AudioNova",
    description: "AI music/video production company.",
    image: "https://www.tactyqal.com/application/assets/img/apps/audionova1.png",
  },
  {
    name: "Converza — Spanish Learning App",
    description:
      "Language learning app featuring Luna the friendly AI language learning bot.",
    image: "https://www.tactyqal.com/application/assets/img/apps/converza1.png",
  },
];

export const timeline = [
  {
    week: "Week 1-2",
    title: "Ideation & Market Research",
    accent: "text-emerald-400",
  },
  { week: "Week 3-4", title: "Design & Prototyping", accent: "text-teal-300" },
  {
    week: "Week 5-6",
    title: "Full-Stack Development",
    accent: "text-orange-400",
  },
  { week: "Week 7-8", title: "Launch & Marketing", accent: "text-violet-400" },
];

export const features = [
  {
    title: "1:1 Personalized Mentoring",
    description:
      "Every student gets dedicated, expert guidance. No group classes.",
    icon: "graduation",
  },
  {
    title: "Full Stack App with No-Code",
    description: "Build real apps using modern no-code tools and platforms.",
    icon: "code",
  },
  {
    title: "Proven Track Record",
    description: "50+ successful students, real revenue, and top university admits.",
    icon: "trophy",
  },
  {
    title: "University Admission Edge",
    description:
      "Stand out in applications with real-world projects and achievements.",
    icon: "bank",
  },
  {
    title: "Revenue Generation",
    description: "Students learn to build, launch, and monetize their own apps.",
    icon: "chart",
  },
  {
    title: "Life Long Support",
    description: "From ideation to launch, students master the full journey.",
    icon: "heart",
  },
  {
    title: "Pitch & Presentation Skills",
    description: "Learn to pitch, present, and launch on Product Hunt.",
    icon: "mic",
  },
  {
    title: "Media & Recognition",
    description: "Win grants, press coverage, and international recognition.",
    icon: "star",
  },
];

export const tools = [
  "Startup Idea Generator",
  "Fundability Assessment",
  "Team Evaluation Tool",
  "Pitch Deck Analyzer",
  "Top 10 Traits For Business Success",
  "Cofounder Compatibility Test",
  "Problem-Solution Fit",
  "Website Landing Page Assessment",
];

export const testimonials = [
  {
    name: "Aarav Sharma",
    quote: "I had to struggle to find a tech cofounder.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Isha Patel",
    quote: "Now I feel independent and can build anything I want.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohan Verma",
    quote: "It's the future.",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    name: "Simran Kaur",
    quote:
      "I can focus on the creative side and don't have to worry about whether it can be built.",
    avatar: "https://randomuser.me/api/portraits/women/69.jpg",
  },
  {
    name: "Devansh Mehta",
    quote: "I went on from having no idea to launching my app.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Priya Nair",
    quote: "My impact app was only in my head till I built it.",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
  },
];

export const pricing = {
  original: "₹25,000",
  current: "₹16,000",
  features: [
    "8 weeks of 1:1 mentoring",
    "Full-stack app development",
    "Product Hunt launch",
    "Pitch deck creation",
    "Marketing strategy",
    "Ongoing support",
  ],
  guarantee: "Results guaranteed or money back",
  urgency: "Limited time offer — Only 15 spots available for the month",
};

export const faqs = [
  {
    q: "What if my teen has no coding experience?",
    a: "No problem! Our program is designed for beginners. We use no-code tools and guide students step-by-step.",
  },
  {
    q: "How do you guarantee university admissions?",
    a: "We help students build standout projects that strengthen their university applications.",
  },
  {
    q: "What kind of apps do students typically build?",
    a: "Apps range from AI-powered tools, e-commerce platforms, subscription services, to social good projects. We help students pick ideas that excite them.",
  },
  {
    q: "How much time commitment is required?",
    a: "About 2-3 hours per week, including 1 hour of live mentoring and independent work.",
  },
  {
    q: "What is the success rate?",
    a: "100% of our students launch a working app and achieve their goals.",
  },
  {
    q: "Can my teen generate real revenue?",
    a: "Yes! Many of our students have generated real revenue and even won grants & media coverage.",
  },
  {
    q: "What universities have your students gotten into?",
    a: "Our alumni have been admitted to top universities in the US, UK, including Ivy League.",
  },
  {
    q: "What ongoing support do you provide?",
    a: "We offer ongoing support, alumni community, and guidance even after the program ends.",
  },
];

export const contact = {
  email: "tactyqal.labs@gmail.com",
  phone: "+91-98047-72106",
  hours: "Mon-Sat, 9am-7pm",
  response: "Response Time: Within 24 hours",
};
