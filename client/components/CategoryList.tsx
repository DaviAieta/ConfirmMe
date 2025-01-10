"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { CategoryCard } from "./CategoryCard";
import { useEffect, useState } from "react";
import { CategoryProps } from "@/app/categories/types";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { CreateCategory } from "./CategoryCreate";
import { Spinner } from "./Spinner";

export const ListCategories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const getCategories = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "categories",
      });
      if (response.status === 200) {
        const categoriesWithCount = response.data.map((category: any) => ({
          ...category,
          eventCount: category._count?.Events || 0,
        }));
        setCategories(categoriesWithCount);
      } else {
        toast({
          title: String(response.status),
          description: response.data,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data || "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const filteredCategory = categories
    .filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  if (loading) {
    return (
      <div className="min-h[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (categories.length == 0) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen">
        <main className="bg-white rounded-lg p-10 w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            No categories have been created yet
          </h1>
          <div className="mt-5">
            <CreateCategory setCategories={setCategories} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex-1 overflow-y-auto p-10">
        <div className="flex justify-around items-center mb-4">
          <div className="relative w-full md:w-2/3 lg:w-2/3">
            <Search className="absolute left-2.5 top-2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="w-full py-3 px-4 pl-12 bg-white rounded-xl border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <h1 className="text-4xl font-bold">Categories</h1>
              </div>
              <CreateCategory setCategories={setCategories} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategory.map((category) => (
              <Link key={category.uuid} href={`/categories/${category.uuid}`}>
                <div className="rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative">
                  <CategoryCard
                    category={category}
                    eventCount={category.eventCount}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
