import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  size?: "sm" | "md" | "lg";
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  size = "md",
  placeholder,
  className = "",
  value,
  onChange,
}: SearchInputProps) {
  const inputSize = {
    sm: "pl-4 pr-10 py-3 text-12",
    md: "pl-4 pr-10 py-3.5 text-14",
    lg: "pl-4 pr-10 py-4 text-16",
  };

  const iconSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <>
      <div className="relative">
        <label htmlFor="searchLocation" className="sr-only">
          search
        </label>
        <input
          type="search"
          name="searchLocation"
          id="searchLocation"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-gray500 ${inputSize[size]} ${className} focus:outline-travel-primary-light100 focus:bg-travel-gray100`}
        />
        <button
          type="submit"
          className={
            "absolute right-3 top-1/2 -translate-y-1/2 text-travel-text100 cursor-pointer"
          }
        >
          <Search className={`${iconSize[size]} stroke-2`} />
        </button>
      </div>
    </>
  );
}
