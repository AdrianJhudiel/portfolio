export type RootKind = "about" | "skills" | "projects" | "experience" | "education";

export const singleNodeContent: Record<"about" | "experience" | "education", string> = {
  about:
    "IT graduate and backend-leaning full-stack developer. Currently a Performance-Based Associate (formerly Technical Intern) at MetaWatt LLC, building structured, typed systems across NestJS, Spring Boot, and Python — with a growing focus on database architecture and CRM/business-process automation.",
  experience:
    "Performance-Based Associate (formerly Technical Intern) at MetaWatt LLC. Full-stack and backend-leaning engineering work spanning NestJS/TypeScript APIs, Spring Boot services, Python automation, and PostgreSQL/MySQL/Supabase data layers — plus CRM workflow automation via GoHighLevel, Zapier, and Make.com.",
  education:
    "IT Graduate. Capstone project Cyber Kids, a game built in Lua, presented at ICE 2025, Silliman University.",
};
