import React, { useState } from "react";
import { CiBag1 } from "react-icons/ci";

interface InventoryProps {
  items: string[];
}

function Inventory({ items }: InventoryProps) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const handleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  // 20 slot olacak şekilde tüm hücreleri belirle
  const totalSlots = 20;
  const filledSlots = items.slice(0, totalSlots);
  const emptySlots = totalSlots - filledSlots.length;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-['UnifrakturCook'] text-[#7eb6ff] tracking-wider shadow-[2px_2px_0_#1a233a]">
        Envanter
      </h2>

      <button
        onClick={handleInventory}
        className="text-3xl text-yellow-300 hover:text-yellow-500 transition bg-gradient-to-r from-[#4a6fa5] to-[#7eb6ff] text-[#101624] border-2 border-[#2a4062] rounded-lg font-['UnifrakturCook'] text-lg py-2 px-4 shadow-md"
      >
        <CiBag1 />
      </button>

      {isInventoryOpen && (
        <div className="grid grid-cols-4 grid-rows-5 gap-2 mt-4">
          {filledSlots.map((item, index) => (
            <div
              key={`item-${index}`}
              className="w-16 h-16 bg-[#7eb6ff] border-2 border-[#4a6fa5] rounded-md font-['UnifrakturCook'] text-lg flex items-center justify-center text-[#101624] shadow-sm"
            >
              {item}
            </div>
          ))}

          {Array.from({ length: emptySlots }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-16 h-16 bg-[#7eb6ff] border-2 border-[#4a6fa5] rounded-md opacity-50 shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;
