'use client'
import { useState } from "react"
import { Bell, ChevronLeft, ChevronRight, Copy, List, LogOut, PlusCircle, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CreateEvents } from "./create-events"

interface Event {
    id: number
    name: string
    date: string
    confirmed: number
    declined: number
    pending: number
}

export function ListEvents() {
    const [events, setEvents] = useState<Event[]>([
        { id: 1, name: "Aniversário de Marcia Lisander", date: "15/07/2024", confirmed: 15, declined: 5, pending: 10 },
        { id: 2, name: "Casamento de Julio e Nicole", date: "10/12/2023", confirmed: 80, declined: 10, pending: 10 },
        { id: 3, name: "5 anos da Luna Anita", date: "26/05/2023", confirmed: 20, declined: 5, pending: 5 },
    ])

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
                        <CreateEvents />
                    </Sheet>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                            <CardHeader className="bg-indigo-500 text-white">
                                <CardTitle>{event.name}</CardTitle>
                                <p className="text-indigo-100">{event.date}</p>
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
                                            strokeDasharray={`${(event.confirmed / (event.confirmed + event.declined + event.pending)) * 314} 314`}
                                        />
                                    </svg>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    Convidados
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copiar Link
                                </Button>
                                <Button variant="outline" size="sm">
                                    <List className="w-4 h-4 mr-2" />
                                    Lista
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Button variant="outline" size="icon" className="mr-2">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="ml-2">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </main>
        </div>
    )
}