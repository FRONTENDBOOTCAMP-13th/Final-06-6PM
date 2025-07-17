import React from "react";

interface InputProps {
  id?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  type?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id = "inputId",
  name = "name",
  size = "md",
  type = "text",
  placeholder = "내용을 입력하세요",
  className = "",
  defaultValue,
  onChange,
}: InputProps) {
  const inputSize = {
    sm: "px-4 py-3 text-14",
    md: "px-4 py-3.5 text-16",
    lg: "px-4 py-4 text-16",
  };

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {id}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-gray500 ${inputSize[size]} ${className} focus:outline-travel-primary-light100 focus:bg-travel-gray100`}
      />
    </>
  );
}
