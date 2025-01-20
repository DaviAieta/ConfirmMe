"use client";

import { CategoryProps } from "@/app/categories/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { useToast } from "@/hooks/use-toast";
import { use } from "react";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { EditCategory } from "./EditCategory";
import { useAuth } from "@clerk/nextjs";

export const CategoryDetails = ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const resolvedParams = use(params);
  const [category, setCategory] = useState<CategoryProps | null>(null);
  const { toast } = useToast();

  const { userId } = useAuth();

  const getCategory = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "categories/" + resolvedParams.uuid,
        headers: { Authorization: `Bearer ${userId}` },
      });
      if (response.status === 200) {
        const categoryData = {
          ...response.data,
          eventCount: response.data._count?.Events || 0,
        };
        setCategory(categoryData);
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
    }
  };

  useEffect(() => {
    getCategory();
  }, [resolvedParams.uuid]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Category not found</h2>
        <Link href="/categories" className="text-blue-500 hover:underline">
          Comeback to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden mt-10">
        <CardHeader
          className="text-primary-foreground p-6"
          style={{
            backgroundColor: category?.color,
            color: "white",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <CardTitle className="text-2xl">{category.name}</CardTitle>
              </div>
            </div>
            <div className="flex space-x-4">
              <DeleteCategoryDialog
                resolvedParams={resolvedParams}
                title={String(category?.name)}
              />
              {category && (
                <EditCategory
                  category={category}
                  resolvedParams={resolvedParams}
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h1 className="text-lg font-semibold mb-2">
                {category.Events.length} Registered Events
              </h1>
              {category.Events && category.Events.length > 0 ? (
                <div className="space-y-4">
                  {category.Events.map((event) => (
                    <div key={event.id} className="border p-4 rounded-lg">
                      <h2 className="font-bold">{event.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {event.EventGuest.length} Guest(s)
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No events found.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
