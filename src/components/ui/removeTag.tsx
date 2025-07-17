"use client";

import { useState } from "react";
import TagItem from "@/components/ui/tagItem";

interface Tag {
 id: number;
 name: string;
}

interface RemoveTagProps {
  tagData: Tag[];
}

export default function RemoveTag({ tagData }: RemoveTagProps) {
 const [tags, setTags] = useState(tagData);

 const handleRemove = (id: number) => {
   const filteredTags = tags.filter(tag => tag.id !== id);
   setTags(filteredTags);
 };

 return (
   <div className="flex gap-2">
     {tags.map(tag => (
       <TagItem key={tag.id} variant="outline" closeIcon onRemove={() => handleRemove(tag.id)}>
         {tag.name}
       </TagItem>
     ))}
   </div>
 );
}