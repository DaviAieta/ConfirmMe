"use client";

import { CategoryProps } from "@/app/categories/types";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

export const CategoryCard = ({
  category,
  eventCount,
}: {
  category: CategoryProps;
  eventCount: number;
}) => {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader
        className=" p-4"
        style={{
          backgroundColor: category.color,
          color: "white",
        }}
      >
        <h3 className="text-2xl font-bold text-white">{category.name}</h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </div>
              <span className="font-semibold">{eventCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
