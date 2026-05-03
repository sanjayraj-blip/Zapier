"use client";
import { ReactNode } from "react";
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const LinkButton = ({ children, onClick }: ButtonProps) => {
  return (
    <div
      className=" flex flex col justify-content justify-center mt-3 p-2 cursor-pointer rounded-sm hover:bg-slate-100 font-light text-sm"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default LinkButton;
