import React from "react";
import { motion } from "framer-motion";
import { GiBroadsword, GiWalkingBoot } from "react-icons/gi";
import { LuSpeech } from "react-icons/lu";

interface AnimationProps {
  type: string | null;
  duration: number;
  onComplete: () => void;
}

function Animation({ type, duration = 2, onComplete }: AnimationProps) {
  if (!type) {
    return null;
  }
  const animations = {
    fight: {
      icon: GiBroadsword,
      motionProps: {
        animate: { rotate: [0, 45, -45, 0], x: [0, 10, -10, 0] },
        transition: { duration, repeat: 1, ease: "easeInOut" },
      },
    },
    move: {
      icon: GiWalkingBoot,
      animate: { x: [0, 10, -10], y: [10, -10, 0] },
      transition: { duration: duration * 0.8, repeat: 1, ease: "easeInOut" },
    },
    talk: {
      icon: LuSpeech,
      motionProps: {
        animate: {
          scale: [1, 1, 1],
          opacity: [0.5, 1, 0.5],
        },
      },
    },
  };

  const { icon: Icon, motionProps } = animations[type] || {};

  if (!icon) {
    return null;
  }

  return (
    <motion.div
      {...motionProps}
      onAnimationComplete={onComplete}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -tranlsate-y-1/2 z-50 "
    >
      <Icon className="w-16 h-16 text-yellow-600" />
    </motion.div>
  );
}

export default Animation;
