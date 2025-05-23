"use client";

import { useState } from "react";
import storyData from "@/app/data/story";
import Inventory from "./components/Inventory";
import Animation from "./components/Animation";
import { SceneChoice, SceneEffect, Scene } from "./types/game";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<string>("start");
  const [health, setHealth] = useState<number>(100);
  const [inventory, setInventory] = useState<string[]>([
    "Sword",
    "Dagger",
    "Spear",
  ]);
  const [animation, setAnimation] = useState<string | null>(null);
  const [error, setError] = useState({
    state: false,
    value: "",
  });

  const notify = () => toast(error.value);

  const handleChoice = (choice: SceneChoice) => {
    console.log({ choice });
    setAnimation(choice.animationType);

    if (choice.effect) {
      switch (choice.effect.type) {
        case "addItem":
          setInventory([...inventory, choice.effect.value as string]);
          break;
        case "removeItem":
          if (inventory.includes(choice.effect?.value as string)) {
            setInventory(
              inventory.filter(
                (item) => item !== (choice.effect?.value as string)
              )
            );
          } else {
            setError({
              state: true,
              value: `Öğe ${choice.effect.value} Envanterde bulunamadı!`,
            });
          }

          break;
        case "health":
          setHealth((prev) =>
            Math.max(0, prev + (choice.effect!.value as number))
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
      {error.state && <ToastContainer />}
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
              (!choice.condition ||
                inventory.includes(choice.condition.hasItem)) && (
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
