import React from "react";

interface InputProps {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  size = "md",
  placeholder,
  className = "",
  value,
  onChange,
}: InputProps) {
  const inputSize = {
    sm: "px-4 py-3 text-12",
    md: "px-4 py-3.5 text-14",
    lg: "px-4 py-4 text-16",
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-text100 ${inputSize[size]} ${className}`}
    />
  );
}
