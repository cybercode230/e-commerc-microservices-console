export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  subCategory: string;
  difficulty: DifficultyLevel;
  rating: number;
  estimatedTime: number; // in minutes
  xpReward: number;
}

export type CategoryType =
  | "coding"
  | "cyber"
  | "math"
  | "algorithms"
  | "logic"
  | "system-design"
  | "real-world";

export type ChallengeType = "theory" | "practical";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Category {
  id: CategoryType;
  name: string;
  icon: string;
  color: string;
  gradient: string[];
  description: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentCategory: CategoryType;
  description: string;
  icon: string;
  color: string;
  gradient: string[];
  type: ChallengeType;
}

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  skillBreakdown: {
    [key in CategoryType]: number; // 0-100 percentage
  };
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type: "challenge" | "streak" | "achievement" | "system";
}
