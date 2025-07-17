"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import SearchInput from "@/components/form/searchInput";

export default function ComponentPage() {
  const [inputValueSm, setInputValueSm] = useState("");
  const [inputValueMd, setInputValueMd] = useState("");
  const [inputValueLg, setInputValueLg] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <div className="flex flex-col items-center">
      {/* Input */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">Input</h2>
        <Input
          size="sm"
          placeholder="default-input-sm"
          value={inputValueSm}
          onChange={(e) => setInputValueSm(e.target.value)}
        />
        <Input
          size="md"
          placeholder="default-input-md"
          value={inputValueMd}
          onChange={(e) => setInputValueMd(e.target.value)}
        />
        <Input
          size="lg"
          placeholder="default-input-lg"
          value={inputValueLg}
          onChange={(e) => setInputValueLg(e.target.value)}
        />
      </div>

      {/* SearchInput */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">Search-Input-sm</h2>

        <SearchInput size="md" placeholder="search-input-sm" />
        <SearchInput size="md" placeholder="search-input-md" />
        <SearchInput size="lg" placeholder="search-input-lg" />
      </div>

      {/* TextArea */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">Textarea</h2>
        <Textarea
          placeholder="text text text text text text text text text text text"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </div>
    </div>
  );
}
