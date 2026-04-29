"use client";
import { ReactNode } from "react";
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const LinkButton = ({ children, onClick }: ButtonProps) => {
  return (
    <div
      className="px-4 py-4 cursor-pointer hover:bg-slate-100"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default LinkButton;
