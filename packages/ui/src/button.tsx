"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean; 
}

export const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined} 
      type="button"
      className={`text-white bg-blue-700 text-bold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} 
      disabled={disabled} 
    >
      {children}
    </button>
  );
};
