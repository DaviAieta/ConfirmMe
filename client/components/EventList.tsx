'use client'

import { useEffect, useState } from "react"
import { Search, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { CreateEvents } from "./EventCreate"
import { EventProps } from "../app/events/types"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "./Spinner"
import { Input } from "./ui/input"
import Link from "next/link"
import { EventCard } from "./EventCard"
import { Dialog, DialogTrigger } from "./ui/dialog"

export function ListEvents() {
    const [events, setEvents] = useState<EventProps[]>([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    const getEvents = async () => {
        try {
            const response = await fetchAdapter({
                method: 'GET',
                path: 'events'
            })
            if (response.status === 200) {
                setEvents(response.data)
            } else {
                toast({
                    variant: "destructive",
                    title: "Failed to load events",
                })
            }
        } catch {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an issue fetching the events.",
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    const filteredEvent = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    )

    const currentDate = new Date()
    const upcomingEvents = filteredEvent.filter(event => new Date(event.dhStart) >= currentDate)
    const pastEvents = filteredEvent.filter(event => new Date(event.dhStart) < currentDate)

    if (loading) {
        return (
            <div className="min-h[400px] flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (events.length == 0) {
        return (
            <div className="flex flex-1 items-center justify-center min-h-screen">
                <main className="bg-white rounded-lg p-10 w-full max-w-2xl text-center">
                    <h1 className="text-4xl font-bold text-gray-900">No events have been created yet</h1>
                    <div className="mt-5">
                        <CreateEvents setEvents={setEvents} />
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-10">
                <div className="flex justify-around items-center mb-4">
                    <div className="relative w-full md:w-2/3 lg:w-2/3">
                        <Search className="absolute left-2.5 top-2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search events..."
                            className="w-full py-3 px-4 pl-12 bg-white rounded-xl border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
                            <p className="mt-2 text-gray-600">See My Events</p>
                        </div>
                        <CreateEvents setEvents={setEvents} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {upcomingEvents.map((event) => (
                            <Link key={event.uuid} href={`/events/${event.uuid}`}>
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative">
                                    <EventCard event={event} isUpcoming={true} />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h1 className="text-3xl font-bold text-gray-900">Past Events</h1>
                        <p className="mt-2 text-gray-600">See My Past Events</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            {pastEvents.map((event) => (
                                <Link key={event.uuid} href={`/events/${event.uuid}`}>
                                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative">
                                        <EventCard event={event} isUpcoming={false} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
