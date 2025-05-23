import { MotionProps } from "framer-motion";
import { IconType } from "react-icons";

export interface SceneChoice {
  text: string;
  nextScene: string;
  animationType: "move" | "talk" | "fight" | null;
  effect?: SceneEffect;
  condition?: {
    hasItem: string;
  };
}

export interface SceneEffect {
  type: "addItem" | "removeItem" | "health";
  value: string | number;
}

// export type SceneEffect =
//   | { type: "addItem"; value: string }
//   | { type: "removeItem"; value: string }
//   | { type: "health"; value: number };

export interface Scene {
  id: string;
  text: string;
  choices: SceneChoice[];
}

export interface AnimationProps {
  type: string | null;
  duration: number;
  onComplete: () => void;
}

export interface AnimationConfig {
  icon: IconType;
  motionProps?: MotionProps;
  animate?: { [key: string]: any };
  transition?: { duration: number; repeat?: number; ease?: string };
}

export type AnimationType = "move" | "talk" | "fight";

export type AnimationsMap = Record<AnimationType, AnimationConfig>;
