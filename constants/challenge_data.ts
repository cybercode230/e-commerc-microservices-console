export interface ChallengeOption {
  id: string;
  label: string;
  weight?: Record<string, number>;
  difficulty?: number;
  minutes?: number;
  stress?: number;
}

export interface OnboardingStep {
  id: string;
  type: "single_choice" | "multi_choice";
  title: string;
  description?: string;
  maxSelections?: number;
  options: ChallengeOption[];
}

export interface SubCategory {
  id: string;
  title: string;
  parentId: string;
  icon: string;
  description: string;
  color: string;
  gradient: string[];
  type: "theory" | "practical";
}

export const MAIN_CATEGORIES = [
  { id: "all", label: "All", icon: "apps-outline" },
  { id: "coding", label: "Coding", icon: "code-slash" },
  { id: "cyber", label: "Cyber Security", icon: "shield-half" },
  { id: "algorithms", label: "Algorithms", icon: "git-branch" },
  { id: "math", label: "Mathematics", icon: "calculator" },
  { id: "logic", label: "Logic", icon: "bulb" },
];

export const SUB_CATEGORIES: SubCategory[] = [
  // Coding
  {
    id: "debugging",
    title: "Debugging",
    parentId: "coding",
    icon: "bug",
    description: "Find and fix errors in complex codebases.",
    color: "#EF4444",
    gradient: ["#F87171", "#EF4444"],
    type: "theory",
  },
  {
    id: "rest_api",
    title: "REST API Design",
    parentId: "coding",
    icon: "cloud-upload",
    description: "Build scalable and secure APIs.",
    color: "#3B82F6",
    gradient: ["#60A5FA", "#3B82F6"],
    type: "practical",
  },

  // Cyber Security
  {
    id: "cryptography",
    title: "Cryptography",
    parentId: "cyber",
    icon: "lock-closed",
    description: "Implementation of encryption protocols.",
    color: "#6366F1",
    gradient: ["#818CF8", "#6366F1"],
    type: "theory",
  },
  {
    id: "penetration",
    title: "Penetration Testing",
    parentId: "cyber",
    icon: "terminal",
    description: "Ethical hacking and vulnerability assessment.",
    color: "#111827",
    gradient: ["#374151", "#111827"],
    type: "practical",
  },

  // Math
  {
    id: "discrete_math",
    title: "Discrete Math",
    parentId: "math",
    icon: "infinite",
    description: "Logic, sets, and graph theory foundations.",
    color: "#10B981",
    gradient: ["#34D399", "#10B981"],
    type: "theory",
  },
  {
    id: "calc_viz",
    title: "Calculus Visualization",
    parentId: "math",
    icon: "analytics",
    description: "Understanding rates of change through patterns.",
    color: "#F59E0B",
    gradient: ["#FBBF24", "#F59E0B"],
    type: "theory",
  },

  // Algorithms
  {
    id: "searching",
    title: "Searching",
    parentId: "algorithms",
    icon: "search",
    description: "Master efficient data retrieval.",
    color: "#8B5CF6",
    gradient: ["#A78BFA", "#8B5CF6"],
    type: "theory",
  },
  {
    id: "dynamic_prog",
    title: "Dynamic Programming",
    parentId: "algorithms",
    icon: "layers",
    description: "Optimize complex recursive problems.",
    color: "#F43F5E",
    gradient: ["#FB7185", "#F43F5E"],
    type: "practical",
  },

  // Logic
  {
    id: "deduction",
    title: "Deduction",
    parentId: "logic",
    icon: "help-buoy",
    description: "Infer conclusions from provided constraints.",
    color: "#06B6D4",
    gradient: ["#22D3EE", "#06B6D4"],
    type: "theory",
  },
];

export const ONBOARDING_CONFIG: OnboardingStep[] = [
  {
    id: "primary_goal",
    type: "single_choice",
    title: "What is your main goal?",
    description: "This helps us tailor challenges to your needs.",
    options: [
      {
        id: "learn_fundamentals",
        label: "Learn fundamentals",
        weight: { difficulty: -1 },
      },
      {
        id: "improve_problem_solving",
        label: "Improve problem-solving",
        weight: { logic: 2 },
      },
      {
        id: "interview_preparation",
        label: "Prepare for interviews",
        weight: { algorithms: 3 },
      },
      {
        id: "real_world_skills",
        label: "Solve real-world tech problems",
        weight: { real_world: 3 },
      },
    ],
  },
  {
    id: "skill_level",
    type: "single_choice",
    title: "What is your current level?",
    options: [
      { id: "beginner", label: "Beginner", difficulty: 1 },
      { id: "intermediate", label: "Intermediate", difficulty: 2 },
      { id: "advanced", label: "Advanced", difficulty: 3 },
    ],
  },
  {
    id: "thinking_style",
    type: "single_choice",
    title: "How do you prefer to think?",
    options: [
      { id: "step_by_step", label: "Step-by-step reasoning" },
      { id: "visual", label: "Visual & patterns" },
      { id: "challenge_first", label: "Give me the problem first" },
    ],
  },
  {
    id: "daily_time",
    type: "single_choice",
    title: "How much time can you spend daily?",
    options: [
      { id: "5_10", label: "5-10 Minutes", minutes: 10 },
      { id: "15_30", label: "15-30 Minutes", minutes: 30 },
      { id: "deep_focus", label: "Deep Focus (60m+)", minutes: 60 },
    ],
  },
  {
    id: "pace",
    type: "single_choice",
    title: "How challenging should it feel?",
    options: [
      { id: "relaxed", label: "Relaxed", stress: 1 },
      { id: "balanced", label: "Balanced", stress: 2 },
      { id: "intense", label: "Intense", stress: 3 },
    ],
  },
];
