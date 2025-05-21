"use client";

import { useState } from "react";
import storyData from "@/app/data/story";
import Inventory from "./components/Inventory";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<string>("start");
  const [health, setHealth] = useState<number>(100);
  const [inventory, setInventory] = useState<string[]>([
    "Sword",
    "Dagger",
    "Spear",
  ]);

  const handleChoice = (nextScene: string) => {
    setCurrentScene(nextScene);
  };

  const resetGame = () => {
    setCurrentScene("start");
    setInventory([]);
  };

  const scene = storyData[currentScene];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Fantasy RPG</h1>
        <p className="text-lg mb-6">{scene.text}</p>
        <div>
          {scene.choices.map((choice, index: number) => (
            <button
              onClick={() => handleChoice(choice.nextScene)}
              key={index}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mx-2 rounded"
            >
              {choice.text}
            </button>
          ))}
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
