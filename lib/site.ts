export const siteConfig = {
  name: "Jhudiel Adrian B. Artezuela",
  role: "Full-Stack / Backend-Leaning Developer",
  company: "MetaWatt LLC",
  companyTitle: "Performance-Based Associate",
  email: "jhudzartezuela@gmail.com",
  github: "https://github.com/adrianjhudiel",
  // TODO: once this is deployed on Vercel (or a custom domain is attached),
  // update this to the real production URL — it feeds metadataBase, the
  // sitemap, robots.txt, and the Open Graph/Twitter share previews.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-adrianjhudiel.vercel.app",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
