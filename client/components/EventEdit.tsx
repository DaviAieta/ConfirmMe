import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "./ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { EventProps } from "@/app/events/types"
import { useRouter } from "next/navigation"

export const EditEvent: React.FC<{ event: EventProps; params: { uuid: string } }> = ({ event, params }) => {
    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [dhStart, setDhStart] = useState(
        event.dhStart ? new Date(event.dhStart).toISOString().slice(0, 16) : ""
    )
    const [dhEnd, setDhEnd] = useState(
        event.dhEnd ? new Date(event.dhEnd).toISOString().slice(0, 16) : ""
    )
    const [address, setAddress] = useState(event.address)
    const [peopleLimit, setPeopleLimit] = useState(event.peopleLimit)
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast()
    const router = useRouter()

    const handleEditEvent = async (e: any) => {
        e.preventDefault()
        setSubmitting(true)

        console.log(params.uuid)
        try {
            const response = await fetchAdapter({
                method: "PUT",
                path: "events/update",
                body: {
                    title,
                    description,
                    dhStart,
                    dhEnd,
                    address,
                    people_limit: peopleLimit,
                    status: 'ACTIVATE',
                    uuid: params.uuid,
                }
            })
            if (response.status == 200) {
                toast({
                    title: "Event registered successfully",
                    description: `Event: ${title}`
                })
                router.push("/events")
            }
        } catch {
            toast({
                variant: "destructive",
                title: `Error`,
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button>
                    <Pencil className="w-3 h-3" />
                </Button>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>Create Event</SheetTitle>
                    <SheetDescription>Fill in the fields to add a new event</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleEditEvent}>
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
                    </div >
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600" disabled={submitting}>
                                {submitting ? (
                                    <ReloadIcon className="animate-spin" />
                                ) : (
                                    "Confirm"
                                )}
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form >
            </SheetContent >
        </Sheet>


    )
}   