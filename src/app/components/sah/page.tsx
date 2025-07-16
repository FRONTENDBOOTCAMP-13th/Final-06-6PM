"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import SearchInput from "@/components/ui/searchInput";

export default function ComponentPage() {
  const [inputValueSm, setInputValueSm] = useState("");
  const [inputValueMd, setInputValueMd] = useState("");
  const [inputValueLg, setInputValueLg] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [searchValueSm, setSearchValueSm] = useState("");
  const [searchValueMd, setSearchValueMd] = useState("");
  const [searchValueLg, setSearchValueLg] = useState("");

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Input-sm</h2>
        <Input
          size="sm"
          placeholder="default-input-sm"
          value={inputValueSm}
          onChange={(e) => setInputValueSm(e.target.value)}
        />
      </div>

      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Input-md</h2>
        <Input
          size="md"
          placeholder="default-input-md"
          value={inputValueMd}
          onChange={(e) => setInputValueMd(e.target.value)}
        />
      </div>

      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Input-lg</h2>
        <Input
          size="lg"
          placeholder="default-input-lg"
          value={inputValueLg}
          onChange={(e) => setInputValueLg(e.target.value)}
        />
      </div>

      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Textarea</h2>
        <Textarea
          placeholder="text text text text text text text text text text text"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </div>

      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Search-Input-sm</h2>
        <SearchInput
          size="sm"
          placeholder="search-input-sm"
          value={searchValueSm}
          onChange={(e) => setSearchValueSm(e.target.value)}
        />
      </div>
      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Search-Input-md</h2>
        <SearchInput
          size="md"
          placeholder="search-input-md"
          value={searchValueMd}
          onChange={(e) => setSearchValueMd(e.target.value)}
        />
      </div>
      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Search-Input-lg</h2>
        <SearchInput
          size="lg"
          placeholder="search-input-lg"
          value={searchValueLg}
          onChange={(e) => setSearchValueLg(e.target.value)}
        />
      </div>
    </div>
  );
}
