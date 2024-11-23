'use client'
import { useEffect, useState } from "react"
import { CalendarDays, CalendarDaysIcon, Copy, Info, MapPin, PlusCircle, Search, Sparkle, StarIcon, Ticket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CreateEvents } from "./EventCreate"
import { EventProps } from "../app/events/types"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "./Spinner"
import { Input } from "./ui/input"
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import Image from "next/image";
import { EventCard } from "./EventCard";

export function ListEvents() {
    const [events, setEvents] = useState<EventProps[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const { toast } = useToast()

    const getEvents = async () => {
        try {
            const response = await fetchAdapter({
                method: 'GET',
                path: 'events'
            })
            if (response.status == 200) {
                setEvents(response.data)
                setLoading(false)
            }
            console.log(events)
        } catch {
            toast({
                title: 'Error'
            })
            setLoading(false);
        }
    }

    const handleCopyLink = async (eventUuid: string) => {
        const link = `${window.location.origin}/events/confirm/${eventUuid}`;

        try {
            await navigator.clipboard.writeText(link);
            toast({
                title: "Link copied!",
                description: "The link was successfully copied to the clipboard."
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to copy the link. Please try again."
            });
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    const filteredEvent = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    )

    const imageUrl = ""

    if (loading) {
        return (
            <div className="min-h[400px] flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (events.length === 0) {
        return (
            toast({
                title: "No event prevent"
            })
        )
    }

    return (
        <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-10">
                <div className="flex justify-around items-center mb-4">
                    <div className="relative w-full md:w-2/3 lg:w-2/3">
                        <Search className="absolute left-2.5 top-2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search events..."
                            className="w-full py-3 px-4 pl-12 bg-white rounded-xl border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>


                </div>

                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg-px-8 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
                            <p className="mt-2 text-gray-600">See your events</p>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="bg-indigo-500 hover:bg-indigo-600 w-56">
                                    New Event
                                </Button>
                            </SheetTrigger>
                            <CreateEvents setEvents={setEvents} />
                        </Sheet>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {filteredEvent.map((event) => (
                            <div key={event.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>

                </div>

            </main >
        </div >
    )
}