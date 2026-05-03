import { ReactNode } from "react";

interface DarkButtonProps {
  children: ReactNode;
  onClick: () => void;
  size?: "small" | "big";
}

const DarkButton = ({ children, onClick, size = "small" }: DarkButtonProps) => {
  return (
    <button
      className={`${size === "small" ? "text-base px-6 py-2" : "text-lg px-8 py-3"} bg-purple-700 rounded-md text-white font-semibold hover:shadow-md cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DarkButton;
