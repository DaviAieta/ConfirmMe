"use client";

import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Pencil, PlusIcon } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { EventProps } from "@/app/events/types";
import { useRouter } from "next/navigation";
import { CategoryProps } from "@/app/categories/types";
import { DateTimePicker } from "./DateTimePicker";

export const EditEvent: React.FC<{
  event: EventProps;
  resolvedParams: { uuid: string };
}> = ({ event, resolvedParams }) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [category, setCategory] = useState(event.categoriesId || "");
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [dhStart, setDhStart] = useState(
    event.dhStart ? new Date(event.dhStart).toISOString().slice(0, 16) : ""
  );
  const [dhEnd, setDhEnd] = useState(
    event.dhEnd ? new Date(event.dhEnd).toISOString().slice(0, 16) : ""
  );
  const [zipCode, setZipCode] = useState(event.zipCode || "");
  const [address, setAddress] = useState(event.address || "");
  const [link, setLink] = useState(event.link || "");
  const [peopleLimit, setPeopleLimit] = useState(event.peopleLimit || "");
  const [type, setType] = useState<"ONLINE" | "INPERSON" | "">(
    event.type === "ONLINE" || event.type === "INPERSON" ? event.type : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const getCategories = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "categories",
      });
      if (response.status === 200) {
        setCategories(response.data);
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
    getCategories();
  }, []);

  const handleEditEvent = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetchAdapter({
        method: "PUT",
        path: "events/update",
        body: {
          category,
          title,
          description,
          dhStart,
          dhEnd,
          zipCode,
          address,
          link,
          people_limit: peopleLimit,
          status: "ACTIVATE",
          type,
          uuid: resolvedParams.uuid,
        },
      });
      if (response.status == 200) {
        toast({
          title: "Event registered successfully",
          description: `Event: ${title}`,
        });
        router.push("/events");
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
        <Button>
          <Pencil className="w-3 h-3" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] max-h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Fill in the fields to add a new event
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleEditEvent}
          className="space-y-4 flex-grow overflow-auto"
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="sm:text-right">
                Category
              </Label>
              <div className="sm:col-span-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Select
                  value={category.toString()}
                  onValueChange={(value) => setCategory(parseInt(value, 10))}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                          style={{ color: category.color }}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Don't have a category? <br />
                  <a
                    href="/categories"
                    className="text-indigo-500 hover:underline"
                  >
                    Click here
                  </a>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="sm:text-right">
                Title
              </Label>
              <Input
                id="title"
                className="sm:col-span-3"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="sm:text-right">
                Type
              </Label>
              <Select
                value={type}
                onValueChange={(value) =>
                  setType(value as "ONLINE" | "INPERSON")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ONLINE">Online</SelectItem>
                    <SelectItem value="INPERSON">In-person</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="sm:text-right">
                Description
              </Label>
              <Input
                id="description"
                className="sm:col-span-3"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="dhStart" className="sm:text-right">
                Start
              </Label>
              <DateTimePicker onChange={setDhStart} initialValue={dhStart} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="dhEnd" className="sm:text-right">
                Finish
              </Label>
              <DateTimePicker onChange={setDhEnd} initialValue={dhEnd} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="zipCode" className="sm:text-right">
                Zip Code
              </Label>
              <Input
                id="zipCode"
                className={`col-span-3 ${
                  type === "ONLINE" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                maxLength={5}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="sm:text-right">
                Address
              </Label>
              <Input
                id="address"
                className={`col-span-3 ${
                  type === "ONLINE" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={type === "ONLINE"}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="sm:text-right">
                Link
              </Label>
              <Input
                id="link"
                className={`col-span-3 ${
                  type === "INPERSON" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={type === "INPERSON"}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="peopleLimit" className="sm:text-right">
                People Limit
              </Label>
              <Input
                id="peopleLimit"
                className="col-span-3"
                value={peopleLimit}
                onChange={(e) => {
                  setPeopleLimit(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 w-full sm:w-auto"
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
