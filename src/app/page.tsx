"use client";

import { useState } from "react";
import storyData from "@/app/data/story";
import Inventory from "./components/Inventory";
import Animation from "./components/Animation";
import { SceneChoice, AnimationType, SceneEffect } from "./types/game";
import { toast, ToastContainer } from "react-toastify";
import { LuSwords, LuFootprints } from "react-icons/lu";
import { RiUserVoiceLine } from "react-icons/ri";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<string>("start");
  const [health, setHealth] = useState<number>(100);
  const [inventory, setInventory] = useState<string[]>([]);
  const [animation, setAnimation] = useState<AnimationType | null>(null);
  const [status, setStatus] = useState<string[]>([]);
  const [error, setError] = useState({
    state: false,
    value: "",
  });

  const notify = () => toast(error.value);

  const handleChoice = (choice: SceneChoice) => {
    console.log({ choice });
    setAnimation(choice.animationType);

    if (choice.effect) {
      const effects = Array.isArray(choice.effect)
        ? choice.effect
        : [choice.effect];

      effects.forEach((effect: SceneEffect) => {
        switch (effect.type) {
          case "addItem":
            if (typeof effect.value === "string") {
              setInventory([...inventory, effect.value]);
            } else if (Array.isArray(effect.value)) {
              setInventory([...inventory, ...effect.value]);
            }
            break;

          case "removeItem":
            if (typeof effect.value === "string") {
              if (inventory.includes(effect.value)) {
                setInventory(inventory.filter((item) => item !== effect.value));
              } else {
                setError({
                  state: true,
                  value: `Öğe ${effect.value} Envanterde bulunamadı!`,
                });
              }
            } else if (Array.isArray(effect.value)) {
              effect.value.forEach((item) => {
                if (inventory.includes(item)) {
                  setInventory(inventory.filter((i) => i !== item));
                } else {
                  setError({
                    state: true,
                    value: `Öğe ${item} Envanterde bulunamadı!`,
                  });
                }
              });
            }
            break;

          case "health":
            if (typeof effect.value === "number") {
              const healthValue = effect.value as number;
              setHealth((prev) => Math.max(0, (prev + healthValue) as number));
            } else {
              console.error(
                "Health effect value must be a number:",
                effect.value
              );
            }
            break;

          case "addStatus":
            if (typeof effect.value === "string") {
              setStatus([...status, effect.value]);
              console.log(`Statü eklendi: ${effect.value}`);
            }
            break;

          case "removeStatus":
            if (typeof effect.value === "string") {
              setStatus(status.filter((s) => s !== effect.value));
              console.log(`Statü silindi: ${effect.value}`);
            }
            break;

          default:
            console.error("Bilinmeyen efekt tipi:", effect.type);
        }
      });
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
    <div className="min-h-screen bg-[url('/GameBackground.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center p-4">
      {error.state && <ToastContainer />}
      <Animation
        type={animation}
        duration={2}
        onComplete={handleAnimationComplete}
      />
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Fantasy RPG</h1>
        <p className="text-lg mb-6">{scene.text}</p>
        <div className="flex justify-evenly">
          {/* {scene.choices.map((choice, index) => {
            const isConditionMet =
              !choice.condition || choice.condition.hasItem
                ? typeof choice.condition?.hasItem === "string"
                  ? inventory.includes(choice.condition.hasItem)
                  : choice.condition?.hasItem?.every((item) =>
                      inventory.includes(item)
                    )
                : true &&
                  (choice.condition.hasStatus
                    ? status.includes(choice.condition.hasStatus)
                    : true);
            return isConditionMet ? (
              <button
                onClick={() => handleChoice(choice)}
                key={index}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mx-2 rounded"
              >
                {choice.text}
              </button>
            ) : (
              <div>Emre</div>
            );
          })} */}
          {scene.choices.map((choice, index) => (
            <button
              key={index}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mx-2 rounded flex items-center gap-0.5"
              onClick={() => handleChoice(choice)}
            >
              {choice.text}
              {choice.animationType === "fight" ? (
                <LuSwords size={28} />
              ) : choice.animationType === "move" ? (
                <LuFootprints size={28} />
              ) : (
                <RiUserVoiceLine size={28} />
              )}
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
