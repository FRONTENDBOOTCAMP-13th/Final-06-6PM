"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  className?: string;
  value?: string; // 외부에서 값 제어
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  size = "md",
  placeholder = "검색어를 입력하세요",
  className = "",
  value,
  onSearch,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value || "");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit 호출됨, inputValue:", inputValue);
    
    if (onSearch) {
      onSearch(inputValue);
    } else {
      console.log("onSearch 함수가 없음");
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
        className={`w-full rounded-lg border border-travel-gray400 bg-white text-travel-text100 placeholder-travel-gray500 ${inputSize[size]} ${className} focus:outline-travel-primary-light100 focus:bg-travel-gray100`}
      />
      <button
        type="submit"
        className="absolute -translate-y-1/2 cursor-pointer right-3 top-1/2 text-travel-text100 hover:text-travel-primary200 transition-colors"
      >
        <Search className={`${iconSize[size]} stroke-2`} />
      </button>
    </form>
  );
}