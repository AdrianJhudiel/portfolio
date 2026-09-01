import { siteConfig } from "@/lib/site";

// Structured data (schema.org Person) so search engines and any tool that
// reads JSON-LD (e.g. recruiter-side link previews) can pick up name/role/
// employer/contact directly, instead of guessing from prose.
export default function PersonJsonLd() {
  const sameAs = [siteConfig.github, siteConfig.linkedin].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    url: siteConfig.url,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
