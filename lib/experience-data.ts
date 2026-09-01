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
      "Backend logic for web applications, including the Django-based ParkTrack reservation system.",
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
      "Hands-on exposure to GoHighLevel for CRM workflow configuration, supporting lead-tracking and business-process automation initiatives.",
  },
  {
    id: "qa",
    label: "Quality Assurance",
    detail:
      "Manual testing, bug tracking, test case writing, and backend/API testing to verify feature reliability before release.",
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
      "AI-native development workflow built around Orca, with Git for version control and Figma for UI/UX prototyping.",
  },
  {
    id: "ai-tools",
    label: "AI-Assisted Development",
    detail:
      "Efficient with AI coding assistants — Claude, ChatGPT, and Gemini — to accelerate development, debugging, and technical research.",
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
      "An appointment-scheduling platform connecting pet owners with veterinary clinics, with dedicated views for owners, vets, and admins.",
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
      "An intuitive parking-reservation system with a clean UI and an end-to-end booking flow — search, reserve, and manage a slot in a few steps.",
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
    description:
      "A community-help platform pairing neighbors for peer support, backed by Google Cloud services with gamified level-progression to keep contributors engaged.",
    features: [
      { label: "Google Cloud-backed backend services", done: true },
      { label: "Gamified level-progression system", done: true },
      { label: "Native Android UI in Kotlin", done: true },
    ],
  },
  {
    id: "mytravelpal",
    title: "MyTravelPal",
    stack: "Android + Kotlin",
    description:
      "A travel companion app with real-time itinerary tracking, keeping trip plans in sync as they change.",
    features: [
      { label: "Real-time itinerary updates", done: true },
      { label: "Native Android UI in Kotlin", done: true },
    ],
  },
  {
    id: "deluge",
    title: "Deluge Adventure TD",
    stack: "Android + Kotlin",
    description:
      "A 2D pixel-art tower-defense game built around custom grid-based placement mechanics.",
    features: [
      { label: "Custom grid-based tower placement", done: true },
      { label: "2D pixel-art visual style", done: true },
      { label: "Native Android build in Kotlin", done: true },
    ],
  },
  {
    id: "cyberkids",
    title: "Cyber Kids",
    stack: "Lua",
    description:
      "A capstone game engineered in Lua with immersive in-game models and custom animations, co-presented at ICE 2025 (Silliman University) to promote cyber-literacy awareness.",
    features: [
      { label: "Custom animations via a built-in animation editor", done: true },
      { label: "Immersive in-game models and game logic in Lua", done: true },
      { label: "Co-presented at ICE 2025, Silliman University", done: true },
    ],
  },
];
