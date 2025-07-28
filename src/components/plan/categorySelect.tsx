"use client";

import TagItem from "@/components/feature/tagItem";
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
    <div className="flex gap-1 flex-wrap">
      {categories.map((category) => (
        <TagItem
          variant={selectedCategory === category.id ? "primary" : "outline"}
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </TagItem>
      ))}
    </div>
  );
}
