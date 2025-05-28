import { MotionProps } from "framer-motion";
import { IconType } from "react-icons";

export interface SceneChoice {
  text: string;
  nextScene: string;
  animationType: "move" | "talk" | "fight" | null;
  effect?: SceneEffect | SceneEffect[];
  condition?: {
    hasItem?: string | string[];
    hasStatus?: string;
  };
}

export interface SceneEffect {
  type: "addItem" | "removeItem" | "health" | "addStatus" | "removeStatus";
  value: string | string[] | number;
}

export interface Scene {
  id: string;
  text: string;
  choices: SceneChoice[];
}

export interface AnimationProps {
  type: AnimationType | null;
  duration: number;
  onComplete: () => void;
}

export interface AnimationConfig {
  icon: IconType;
  motionProps: MotionProps;
  animate?: { [key: string]: any };
  transition?: { duration: number; repeat?: number; ease?: string };
}

export type AnimationType = "move" | "talk" | "fight";

export type AnimationsMap = Record<AnimationType, AnimationConfig>;
