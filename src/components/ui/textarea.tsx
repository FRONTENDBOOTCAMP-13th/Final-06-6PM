import React from "react";

interface TextareaProps {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export default function Textarea({
  id = "textarea",
  name = "textarea",
  placeholder = "",
  className = "",
  value,
  defaultValue,
  onChange,
  rows = 3,
}: TextareaProps) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {id}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        rows={rows}
        className={`w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-gray500 p-3 text-12 focus:outline-travel-primary-light100 focus:bg-travel-gray100 ${className}`}
      />
    </>
  );
}
