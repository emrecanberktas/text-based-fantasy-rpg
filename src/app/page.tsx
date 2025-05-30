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
      <div className="max-w-5xl w-full bg-[rgba(26,35,58,0.95)] border-4 border-[#4a6fa5] rounded-[18px] shadow-[0_0_24px_4px_rgba(0,0,0,0.6)] p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-['UnifrakturCook'] text-[#7eb6ff] tracking-wider shadow-[2px_2px_0_#1a233a]">
            Fantasy RPG
          </h1>
          <div className="text-lg font-['UnifrakturCook'] text-[#7eb6ff] flex items-center gap-2">
            <span>Sağlık:</span> <span className="text-red-700">{health}</span>
          </div>
        </div>
        <p className="text-lg mb-6">{scene.text}</p>
        <div className="flex justify-center items-center flex-wrap shrink gap-2">
          {scene.choices.map((choice, index) => (
            <button
              key={index}
              className="bg-gradient-to-r from-[#4a6fa5] to-[#7eb6ff] text-[#101624] border-2 border-[#2a4062] rounded-lg font-['UnifrakturCook'] text-lg py-2 px-4 shadow-md transition-colors hover:bg-[#2a4062] hover:text-[#e0e6f0] flex items-center gap-2"
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
            className="bg-gradient-to-r from-[#4a6fa5] to-[#7eb6ff] text-[#101624] border-2 border-[#2a4062] rounded-lg font-['UnifrakturCook'] text-lg py-2 px-4 shadow-md transition-colors hover:bg-[#2a4062] hover:text-[#e0e6f0]"
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
