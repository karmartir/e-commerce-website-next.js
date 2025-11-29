'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface Category {
  category: string;
}

interface SearchProps {
  categories: Category[];
}

const Search = ({ categories = [] }: SearchProps) => {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="all" value="all">All Categories</SelectItem>
          {categories.map((x) => (
            <SelectItem key={x.category} value={x.category}>
              {x.category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="text"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
      <Button type="submit"><SearchIcon /></Button>
    </form>
  );
};

export default Search;