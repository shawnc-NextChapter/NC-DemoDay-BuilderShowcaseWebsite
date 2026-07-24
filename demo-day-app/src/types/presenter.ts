import { z } from "zod";

/* ============================================================
   Presenter Data Model
   Maps 1:1 with Google Form fields → presenters.json
   ============================================================ */

// --- Zod Schemas (validation at import time) ---

export const ScreenshotsSchema = z.object({
  desktop: z.string().min(1, "Desktop screenshot is required"),
  mobile: z.string().min(1, "Mobile screenshot is required"),
});

export const DemoCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  tagline: z.string().max(300, "Tagline must be 300 characters or fewer"),
  category: z.string().min(1, "Category is required"),
  targetAudience: z.string(),
  problem: z.string().min(1, "Problem statement is required"),
  keyFeatures: z.array(z.string()),
  biggestChallenge: z.string(),
  futurePlans: z.string().optional(),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  aiUsage: z.array(z.string()),
  liveUrl: z.string().url("Live URL must be a valid URL"),
  repositoryUrl: z.string().url("Repository URL must be a valid URL"),
  requiresLogin: z.boolean(),
  demoCredentials: DemoCredentialsSchema.optional(),
  screenshots: ScreenshotsSchema,
  heroGraphic: z.string().optional(),
  bookingLink: z.string().optional(),
});

export const LinksSchema = z.object({
  github: z.string(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
});

export const PublishingSchema = z.object({
  displayOrder: z.number().int().min(0),
  permissions: z.array(z.string()),
  approved: z.boolean(),
});

export const PresenterSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional(),
  bio: z.string().min(1, "Bio is required"),
  headshot: z.string().min(1, "Headshot is required"),
  proudestAccomplishment: z.string(),
  lessonLearned: z.string(),
  project: ProjectSchema,
  links: LinksSchema,
  publishing: PublishingSchema,
});

export const PresentersArraySchema = z.array(PresenterSchema);

// --- TypeScript Types (inferred from Zod) ---

export type Screenshots = z.infer<typeof ScreenshotsSchema>;
export type DemoCredentials = z.infer<typeof DemoCredentialsSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Links = z.infer<typeof LinksSchema>;
export type Publishing = z.infer<typeof PublishingSchema>;
export type Presenter = z.infer<typeof PresenterSchema>;

// --- Category Options (matching Google Form dropdown) ---

export const PROJECT_CATEGORIES = [
  "Productivity",
  "Education",
  "Health and Wellness",
  "Finance",
  "Community",
  "Entertainment",
  "Developer Tools",
  "Legal Help",
  "Employment",
  "Other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// --- Tech Stack Options (matching Google Form checkboxes) ---

export const TECH_STACK_OPTIONS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Node.js",
  "Express",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Firebase",
  "OpenAI API",
  "Anthropic API",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Neon",
  "Vercel",
  "Railway",
] as const;

export type TechStackOption = (typeof TECH_STACK_OPTIONS)[number];

// --- AI Usage Options (matching Google Form checkboxes) ---

export const AI_USAGE_OPTIONS = [
  "Planning",
  "Debugging",
  "UI Design",
  "Code Generation",
  "Documentation",
  "Learning Concepts",
] as const;

export type AiUsageOption = (typeof AI_USAGE_OPTIONS)[number];
