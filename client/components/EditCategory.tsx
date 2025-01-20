"use client";

import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { use, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { EventProps } from "@/app/events/types";
import { useRouter } from "next/navigation";
import { CategoryProps } from "@/app/categories/types";
import { ColorPicker } from "./ColorPicker";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { useAuth } from "@clerk/nextjs";

export const EditCategory: React.FC<{
  category: CategoryProps;
  resolvedParams: { uuid: string };
}> = ({ category, resolvedParams }) => {
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { userId } = useAuth();

  const handleEditCategory = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "PUT",
        path: "categories/update",
        body: {
          name,
          color,
          uuid: resolvedParams.uuid,
          userId,
        },
      });
      if (response.status == 200) {
        toast({
          title: "Category edited successfully",
          description: `Name: ${name}`,
        });
        router.push("/categories");
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
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Pencil className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Fill in the fields to edit the category
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditCategory}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Name
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Color
              </Label>
              <ColorPicker value={color} onChange={setColor} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600"
                disabled={submitting}
              >
                {submitting ? (
                  <ReloadIcon className="animate-spin" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
