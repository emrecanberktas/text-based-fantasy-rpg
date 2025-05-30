import React, { useState } from "react";
import { CiBag1 } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

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
      <h2 className="mb-4 text-lg medieval-title">Inventory</h2>

      <button
        onClick={handleInventory}
        className="text-3xl text-yellow-300 hover:text-yellow-500 transition medieval-btn"
      >
        <CiBag1 />
      </button>

      {isInventoryOpen && (
        <div className="grid grid-cols-4 grid-rows-5 gap-2 mt-4">
          {filledSlots.map((item, index) => (
            <div
              key={`item-${index}`}
              className="w-16 h-16 inventory-slot-medieval flex items-center justify-center"
            >
              {item}
            </div>
          ))}

          {Array.from({ length: emptySlots }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-16 h-16 inventory-slot-medieval opacity-50"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Inventory;
