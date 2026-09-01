export const siteConfig = {
  name: "Jhudiel Adrian B. Artezuela",
  role: "Full-Stack Developer & Automation Engineer",
  company: "MetaWatt LLC",
  companyTitle: "Performance-Based Associate",
  email: "jhudzartezuela@gmail.com",
  github: "https://github.com/adrianjhudiel",
  // TODO: paste the real LinkedIn profile URL once provided.
  linkedin: "",
  whatsapp: "https://wa.me/639565384687",
  // Downloadable resume/CV — drop the actual file at public/resume.pdf.
  resumeUrl: "/resume.pdf",
  // TODO: once this is deployed on Vercel (or a custom domain is attached),
  // update this to the real production URL — it feeds metadataBase, the
  // sitemap, robots.txt, and the Open Graph/Twitter share previews.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-adrianjhudiel.vercel.app",
  // Jump-nav targets for Simple View's in-page section links.
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
