'use client'
import { useEffect, useState } from "react"
import { Bell, ChevronLeft, ChevronRight, Copy, List, LogOut, PlusCircle, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CreateEvents } from "./create-events"
import { EventProps } from "../types"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { useToast } from "@/hooks/use-toast"

export function ListEvents() {
    const [events, setEvents] = useState<EventProps[]>([])
    const [loading, setLoading] = useState(true);
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
        } catch {
            toast({
                title: 'Error'
            })
            setLoading(false);
        }
    }

    useEffect(() => {
        getEvents()
    }, [])
    return (
        <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="bg-indigo-500 hover:bg-indigo-600 ml-auto">
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Create Event
                            </Button>
                        </SheetTrigger>
                        <CreateEvents setEvents={setEvents} />
                    </Sheet>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                            <CardHeader className="bg-indigo-500 text-white">
                                <CardTitle>{event.title}</CardTitle>
                                <p className="text-indigo-100">{event.description}</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex justify-center mb-4">
                                    <svg className="w-32 h-32">
                                        <circle cx="60" cy="60" r="50" fill="transparent" stroke="#e0e0e0" strokeWidth="10" />
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="transparent"
                                            stroke="#6437fe"
                                            strokeWidth="10"
                                            strokeDasharray={
                                                (event.confirmed + event.declined + event.pending === 0
                                                    ? '0 314'
                                                    : `${(event.confirmed / (event.confirmed + event.declined + event.pending)) * 314} 314`
                                                )
                                            }
                                        />
                                    </svg>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    Guests
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Link
                                </Button>
                                <Button variant="outline" size="sm">
                                    <List className="w-4 h-4 mr-2" />
                                    Guest list
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}