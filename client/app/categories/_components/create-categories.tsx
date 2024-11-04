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

export type Category = {
    setCategories: Dispatch<SetStateAction<CategoriesProps[]>>
}

export const CreateCategory = ({ setCategories }: Category) => {
    const [title, setTitle] = useState("")
    const [active, setActive] = useState("true")
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast()

    const handleCreateCategory = async (e: any) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetchAdapter({
                method: "POST",
                path: "categories/create",
                body: {
                    title,
                    active: active === "true",
                }
            })
            if (response.status == 200) {
                toast({
                    title: "category registered successfully",
                    description: `Category: ${title}`
                })
                setCategories((prevCategory) => [...prevCategory, response.data])
            }
        } catch {
            toast({
                title: `Error`,
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <SheetContent >
            <SheetHeader>
                <SheetTitle>Create Category</SheetTitle>
                <SheetDescription>Fill in the fields to add a new category</SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreateCategory}>
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
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false" disabled={true}>No</SelectItem>
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