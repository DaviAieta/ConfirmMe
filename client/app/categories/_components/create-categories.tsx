'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Dispatch, SetStateAction, useState } from "react";
import { CategoriesProps } from "../types"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"
import { Select, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export type Categorie = {
    setCategories: Dispatch<SetStateAction<CategoriesProps[]>>
}

export const CreateCategorie = ({ setCategories }: Categorie) => {
    const [title, setTitle] = useState("")
    const [active, setActive] = useState("Yes")
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast()

    const createdCategorie = () => {

    }

    return (
        <SheetContent >
            <SheetHeader>
                <SheetTitle>Create Event</SheetTitle>
                <SheetDescription>Fill in the fields to add a new event</SheetDescription>
            </SheetHeader>
            <form onSubmit={createdCategorie}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" className="col-span-3" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                    </div >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="active" className="text-right">
                            Active
                        </Label>
                        <Select onValueChange={setActive}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no" disabled={true}>No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600" disabled={submitting}>
                                {submitting ? (
                                    <ReloadIcon className="animate-spin" />
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </form >
        </SheetContent >
    )
}