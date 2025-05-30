import {
  GiBroadsword,
  GiHealthPotion,
  GiTreasureMap,
  GiMagicSwirl,
  GiWolfHowl,
} from "react-icons/gi";

const items = {
  kılıç: {
    image: GiBroadsword,
    description: "Paslı ama keskin bir kılıç, düşmanlara karşı etkili.",
  },
  iksir: {
    image: GiHealthPotion,
    description: "Sağlığı geri yükleyen büyülü bir iksir.",
  },
  harita: {
    image: GiTreasureMap,
    description: "Ejderha Tacı’na giden yolu gösteren eski bir harita.",
  },
  tılsım: {
    image: GiMagicSwirl,
    description: "Büyülü bir tılsım, tuzakları etkisizleştirir.",
  },
  "sadık kurt": {
    image: GiWolfHowl,
    description: "Sana sadık bir kurt, tehlikelerde yardımcı olur.",
  },
};
export default items;
