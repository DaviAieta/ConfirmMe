"use client"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { GuestProps } from "../app/events/guests/types"
import { EventProps } from "../app/events/types"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { useToast } from "@/hooks/use-toast"
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { PlusCircle } from "lucide-react"
import { PreRegister } from "./PreRegisterGuest"

export const ListGuests = ({ params }: { params: { uuid: string } }) => {
    const [guests, setGuests] = useState<GuestProps[]>([])
    const [event, setEvent] = useState<EventProps | null>(null)
    const { toast } = useToast()

    const eventDetails = {
        name: "",
        date: "",
        location: "",
    }

    const getEvent = async () => {
        try {
            const response = await fetchAdapter({
                method: "GET",
                path: `events/${params.uuid}`
            })
            if (response.status == 200 && response.data) {
                setEvent(response.data)
            } else {
                toast({
                    title: 'Event not found',
                    description: 'The event you are looking for does not exist.'
                })
            }
        } catch {
            toast({
                title: 'Error',
                description: 'An error occurred while fetching the event.'
            })
        }
    }

    const getGuests = async () => {
        try {
            const response = await fetchAdapter({
                method: "GET",
                path: `guests/${params.uuid}`
            })
            if (response.status == 200 && response.data) {
                setGuests(response.data)
            }
        } catch {
            toast({
                title: 'Error',
                description: 'An error occurred while fetching the guests.'
            })
        }
    }

    useEffect(() => {
        getEvent()
    }, [])
    useEffect(() => {
        getGuests()
    }, [])

    return (
        <Card className="w-full max-w-4xl mx-auto my-8 p-8 bg-white shadow-lg">
            <div className="flex justify-end">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="bg-indigo-500 hover:bg-indigo-600 ml-auto">
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Pre Register
                        </Button>
                    </SheetTrigger>
                    <PreRegister params={params} />
                </Sheet>
            </div>

            <div className="space-y-6">
                <div className="text-center border-b pb-6">
                    <h1 className="text-3xl font-bold mb-2">{event?.title}</h1>
                    <p className="text-gray-600">{event?.dhStart
                        ? format(new Date(event?.dhStart), "dd MMMM yyyy", { locale: enUS })
                        : "Date not available"}</p>
                    <p className="text-gray-600">{event?.address}</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Guest List</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 text-left">Nome</th>
                                <th className="py-2 px-4 text-left">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.filter((guest) => guest.confirmed).map((guest) => (
                                <tr key={guest.id} className="border-b">
                                    <td className="py-2 px-4">{guest.name}</td>
                                    <td className="py-2 px-4">{guest.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-center text-sm text-gray-500 pt-6 border-t">
                    <p>Total of guests: {guests.length}</p>
                    <p>Document generated {format(new Date(), 'MM/dd/yyyy', { locale: enUS })}</p>
                </div>
            </div>
        </Card>
    )
}