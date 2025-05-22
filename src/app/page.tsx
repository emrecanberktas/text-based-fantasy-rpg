"use client";

import { useState } from "react";
import storyData from "@/app/data/story";
import Inventory from "./components/Inventory";
import Animation from "./components/Animation";

interface SceneChoice {
  text: string;
  nextScene: string;
  animationType: "move" | "talk" | "fight" | null;
  effect?: SceneEffect;
}

interface SceneEffect {
  addItem?: string;
  health?: number;
  removeItem?: string;
}

interface Scene {
  id: string;
  text: string;
  choices: SceneChoice[];
}

export default function Home() {
  const [currentScene, setCurrentScene] = useState<string>("start");
  const [health, setHealth] = useState<number>(100);
  const [inventory, setInventory] = useState<string[]>([
    "Sword",
    "Dagger",
    "Spear",
  ]);
  const [animation, setAnimation] = useState<string | null>(null);

  const handleChoice = (choice: SceneChoice) => {
    console.log({ choice });
    setAnimation(choice.animationType);

    if (choice.effect) {
      if (choice.effect.addItem) {
        setInventory([...inventory, choice.effect.addItem]);
      }
      if (typeof choice.effect.health === "number") {
        setHealth((prev) => Math.max(0, prev + choice.effect.health));
      }
      if (choice.effect.removeItem) {
        setInventory(
          inventory.filter((item) => {
            item !== choice.effect.removeItem;
          })
        );
      }
    }
  };

  const handleAnimationComplete = () => {
    setAnimation(null);
    setCurrentScene(
      storyData[currentScene].choices.find((c) => c.animationType === animation)
        ?.nextScene || currentScene
    );
  };

  const resetGame = () => {
    setCurrentScene("start");
    setInventory([]);
  };

  const scene = storyData[currentScene];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Animation
        type={animation}
        duration={2}
        onComplete={handleAnimationComplete}
      />
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Fantasy RPG</h1>
        <p className="text-lg mb-6">{scene.text}</p>
        <div>
          {scene.choices.map(
            (choice, index: number) =>
              (!choice.condition || inventory.includes.condition.hasItem) && (
                <button
                  onClick={() => handleChoice(choice)}
                  key={index}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mx-2 rounded"
                >
                  {choice.text}
                </button>
              )
          )}
        </div>
        {scene.choices.length === 0 && (
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mx-2 rounded"
          >
            Reset Game
          </button>
        )}
        <div className="mt-4">
          <Inventory items={inventory} />
        </div>
      </div>
    </div>
  );
}
