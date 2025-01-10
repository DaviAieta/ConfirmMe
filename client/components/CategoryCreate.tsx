"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CategoryProps } from "@/app/categories/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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
import { PlusIcon } from "lucide-react";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

export type Event = {
  setCategories: Dispatch<SetStateAction<CategoryProps[]>>;
};

export const CreateCategory = ({ setCategories }: Event) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCreateCategory = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "POST",
        path: "categories/create",
        body: {
          name,
          color,
        },
      });
      if (response.status == 200) {
        toast({
          title: "Category registered successfully",
        });
        setCategories((prevCategories) => [...prevCategories, response.data]);
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
        <Button className="bg-indigo-500 hover:bg-indigo-600 w-56">
          <PlusIcon className="w-3 h-3" /> New Category
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Fill in the fields to add a new category
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateCategory}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Name
              </Label>
              <Input
                id="name"
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
                  "Register"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
