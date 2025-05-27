import { useState, useEffect } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (pos: MouseEvent) => {
      setMousePosition({ x: pos.clientX, y: pos.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};

export default useMousePosition;
