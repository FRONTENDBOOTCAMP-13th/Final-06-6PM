"use client";

import { useState } from "react";
import Input from "@/components/ui/input";

export default function ComponentPage() {
  const [inputValue, setInputValue] = useState("");
  const [inputValueMd, setInputValueMd] = useState("");
  const [inputValueLg, setInputValueLg] = useState("");

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full">
        <h2 className="mb-2 text-xl font-bold">Input-sm</h2>
        <Input
          size="sm"
          placeholder="default-input-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
    </div>
  );
}
