"use client";

import TagItem from "@/components/feature/tagItem";
import Button from "@/components/ui/btn";
import ButtonRounded from "@/components/ui/btnRound";
import React from "react";

export interface Category {
  id: string;
  name: string;
}

export interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <ButtonRounded
          variant="outline"
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={"transition-colors duration-300"}
        >
          {category.name}
        </ButtonRounded>
      ))}
    </div>
  );
}
