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
      rows={4}
      className={`p-3 text-12 rounded-lg border w-full border-travel-gray400 bg-white text-travel-text100 placeholder-travel-text100 ${className} focus:outline-travel-primary-light100 focus:bg-travel-gray100`}
    />
  );
}
