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
import { EventProps } from "../types"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"

export type Event = {
    setEvents: Dispatch<SetStateAction<EventProps[]>>
}

export const CreateEvents = ({ setEvents }: Event) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dhStart, setDhStart] = useState("")
    const [dhEnd, setDhEnd] = useState("")
    const [address, setAddress] = useState("")
    const [peopleLimit, setPeopleLimit] = useState("")
    const [price, setPrice] = useState("")
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast()

    const handleCreatedEvent = async (e: any) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetchAdapter({
                method: "POST",
                path: "events/create",
                body: {
                    title,
                    description,
                    dhStart,
                    dhEnd,
                    address,
                    people_limit: peopleLimit,
                    status: 'ACTIVATE',
                    price,
                }
            })
            if (response.status == 200) {
                toast({
                    title: "Event registered successfully",
                    description: `Event: ${title}`
                })
                setEvents((prevEvents) => [...prevEvents, response.data])
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
                <SheetTitle>Create Event</SheetTitle>
                <SheetDescription>Fill in the fields to add a new event</SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreatedEvent}>
                <div className="grid gap-4 py-4">
                    < div className="grid grid-cols-4 items-center gap-4" >
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" className="col-span-3" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                    </div >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input id="description" className="col-span-3" value={description} onChange={(e) => {
                            setDescription(e.target.value)
                        }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dhStart" className="text-right">
                            Date Time Start
                        </Label>
                        <Input type="datetime-local" id="dhStart" className="col-span-3" value={dhStart} onChange={(e) => {
                            setDhStart(e.target.value)
                        }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dhEnd" className="text-right">
                            Date Start End
                        </Label>
                        <Input type="datetime-local" id="dhEnd" className="col-span-3" value={dhEnd} onChange={(e) => {
                            setDhEnd(e.target.value)
                        }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input id="address" className="col-span-3" value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="peopleLimit" className="text-right">
                            People Limit
                        </Label>
                        <Input id="peopleLimit" className="col-span-3" value={peopleLimit} onChange={(e) => {
                            setPeopleLimit(e.target.value)
                        }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input id="price" className="col-span-3" placeholder="$" value={price} onChange={(e) => {
                            setPrice(e.target.value)
                        }} />
                    </div>
                </div >
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
            </form >
        </SheetContent >
    )
}