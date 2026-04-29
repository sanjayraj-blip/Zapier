"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}

const PrimaryButton = ({ children, onClick, size = "small" }: ButtonProps) => {
  return (
    <div
      className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-4 pt-2" : "px-8 py-10"} bg-amber-700`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default PrimaryButton;
