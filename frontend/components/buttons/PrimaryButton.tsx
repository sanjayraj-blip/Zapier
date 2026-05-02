"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: "big" | "small";
}

const PrimaryButton = ({ children, onClick, size = "small" }: ButtonProps) => {
  return (
    <button
      className={`${size === "small" ? "text-base px-6 py-1" : "text-lg px-8 py-3"} bg-amber-700 rounded-full text-white font-semibold hover:shadow-md cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
