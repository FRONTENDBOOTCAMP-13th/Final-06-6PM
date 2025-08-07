"use client";

import TagItem from "@/components/feature/tagItem";
import React from "react";

export interface Category {
  id: string;
  name: string;
}

export interface CategorySelectProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategorySelect({ categories, selectedCategory, onSelectCategory }: CategorySelectProps) {
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
