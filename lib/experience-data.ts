export type SkillNode = {
  id: string;
  label: string;
  detail: string;
};

export const skillNodes: SkillNode[] = [
  {
    id: "nestjs",
    label: "NestJS",
    detail:
      "Structured REST APIs in NestJS and TypeScript, with modular architecture, DTO-based validation, and guards.",
  },
  {
    id: "spring",
    label: "Spring Boot",
    detail:
      "Java backend services and REST APIs, including the scheduling engine behind FurryFriends.",
  },
  {
    id: "python",
    label: "Python & Django",
    detail:
      "Backend logic and automation scripting, including the Django-based ParkTrack reservation system.",
  },
  {
    id: "databases",
    label: "Database Architecture",
    detail:
      "Schema design, query optimization, and data validation across PostgreSQL, MySQL, and Supabase.",
  },
  {
    id: "crm",
    label: "CRM Automation",
    detail:
      "GoHighLevel funnels and Zapier/Make.com workflows for lead tracking and business process automation.",
  },
  {
    id: "frontend",
    label: "TypeScript & Frontend",
    detail:
      "Type-safe application code across backend and frontend, including React, Next.js, and Tailwind CSS.",
  },
  {
    id: "workflow",
    label: "Dev Workflow",
    detail:
      "Keyboard-driven environment: Neovim (LazyVim), LazyGit, and Linux CLI, with Figma for UI/UX prototyping.",
  },
];

export type ProjectFeature = {
  label: string;
  done: boolean;
};

export type Project = {
  id: string;
  title: string;
  stack: string;
  description: string;
  features: ProjectFeature[];
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "furryfriends",
    title: "FurryFriends",
    stack: "ReactJS + Spring Boot",
    description:
      "A vet appointment scheduling platform connecting pet owners with clinics.",
    features: [
      { label: "Appointment scheduling engine", done: true },
      { label: "Role-based access (owner / vet / admin)", done: true },
      { label: "Spring Boot REST API + ReactJS frontend", done: true },
    ],
  },
  {
    id: "parktrack",
    title: "ParkTrack",
    stack: "Python + Django",
    description:
      "A parking reservation system for booking and managing parking slots.",
    features: [
      { label: "Slot reservation & availability logic", done: true },
      { label: "Django backend with relational database", done: true },
      { label: "User booking dashboard", done: true },
    ],
  },
  {
    id: "collaboraid",
    title: "CollaborAid",
    stack: "Android + Kotlin",
    description: "An Android app for peer collaboration, built in Kotlin.",
    features: [
      { label: "Native Android UI in Kotlin", done: true },
      { label: "Collaboration-focused feature set", done: true },
    ],
  },
  {
    id: "mytravelpal",
    title: "MyTravelPal",
    stack: "Android + Kotlin",
    description: "A travel companion app built for Android with Kotlin.",
    features: [
      { label: "Native Android UI in Kotlin", done: true },
      { label: "Travel planning feature set", done: true },
    ],
  },
  {
    id: "deluge",
    title: "Deluge Adventure TD",
    stack: "Android + Kotlin",
    description: "A tower-defense style Android game built in Kotlin.",
    features: [
      { label: "Tower-defense gameplay loop", done: true },
      { label: "Native Android build in Kotlin", done: true },
    ],
  },
  {
    id: "cyberkids",
    title: "Cyber Kids",
    stack: "Lua",
    description:
      "Capstone game project built in Lua, presented at ICE 2025, Silliman University.",
    features: [
      { label: "Full game built in Lua", done: true },
      { label: "Presented at ICE 2025, Silliman University", done: true },
    ],
  },
];
