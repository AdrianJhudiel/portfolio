export type RootKind = "about" | "skills" | "projects" | "experience" | "education";

export const singleNodeContent: Record<"about" | "experience" | "education", string> = {
  about:
    "IT graduate and backend-leaning full-stack developer. Currently a Performance-Based Associate (formerly Technical Intern) at MetaWatt LLC, working primarily in quality assurance while building structured, typed systems across NestJS, Spring Boot, and Python.",
  experience:
    "Performance-Based Associate (formerly Technical Intern) at MetaWatt LLC. Primarily focused on quality assurance — manual testing, bug tracking, test case writing, and backend/API testing — alongside backend-leaning engineering work spanning NestJS/TypeScript APIs, Spring Boot services, and PostgreSQL/MySQL/Supabase data layers, plus hands-on CRM workflow support via GoHighLevel.",
  education:
    "IT Graduate. Capstone project Cyber Kids, a game built in Lua, presented at ICE 2025, Silliman University.",
};
