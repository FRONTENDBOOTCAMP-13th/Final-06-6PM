import React from "react";

interface TextareaProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  placeholder,
  className = "",
  value,
  onChange,
}: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-3 text-12 rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-text100 ${className}`}
      style={{ width: "380px", height: "120px" }}
    />
  );
}
