"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  className?: string;
  value?: string;
  onSearch?: (value: string) => void | Promise<void>;
}

export default function SearchInput({
  size = "md",
  placeholder = "검색어를 입력하세요",
  className = "",
  value,
  onSearch,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const inputSize = {
    sm: "pl-4 pr-10 py-3 text-12",
    md: "pl-4 pr-10 py-3.5 text-14",
    lg: "pl-4 pr-10 py-4 text-16",
  };

  const iconSize = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!onSearch || isSubmitting) {
      return;
    }

    const searchText = inputValue.trim();
    setIsSubmitting(true);

    try {
      await onSearch(searchText);
    } catch (error) {
      console.error("검색 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <label htmlFor="search" className="sr-only">
        검색
      </label>
      <input
        id="search"
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={isSubmitting}
        className={`w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-gray500 ${inputSize[size]} ${className} focus:outline-travel-primary-light100 focus:bg-travel-gray100 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`absolute -translate-y-1/2 cursor-pointer right-3 top-1/2 text-travel-text100 hover:text-travel-primary200 transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Search className={`${iconSize[size]} stroke-2`} />
      </button>
    </form>
  );
}
