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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EventProps } from "../types"

export type Event = {
    setEvents: Dispatch<SetStateAction<EventProps[]>>
}

export const CreateEvents = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dhStart, setDhStart] = useState("")
    const [dhEnd, setDhEnd] = useState("")
    const [address, setAddress] = useState("")
    const [peopleLimit, setPeopleLimit] = useState("")
    const [status, setStatus] = useState("")
    const [price, setPrice] = useState("")



    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Create Event</SheetTitle>
                <SheetDescription>Fill in the fields to add a new event</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                        Title
                    </Label>
                    <Input id="title" className="col-span-3" value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Input id="description" className="col-span-3" />
                </div>
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600">Register</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}
