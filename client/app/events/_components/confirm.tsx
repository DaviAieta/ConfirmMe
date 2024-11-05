'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, } from "lucide-react"
import Link from 'next/link'
import { EventProps } from '../types'
import { fetchAdapter } from '@/adapters/fetchAdapter'
import { useToast } from "@/hooks/use-toast"
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const ConfirmAttendance = ({ params }: { params: { uuid: string } }) => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [event, setEvent] = useState<EventProps | null>(null)
    const [eventNotFound, setEventNotFound] = useState(false)
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsConfirmed(true)
    }


    const getEvent = async () => {
        try {
            const response = await fetchAdapter({
                method: "GET",
                path: `events/${params.uuid}`
            })
            if (response.status == 200 && response.data) {
                setEvent(response.data)
                setEventNotFound(false)
            } else {
                setEventNotFound(true)
                toast({
                    title: 'Event not found',
                    description: 'The event you are looking for does not exist.'
                })
            }
        } catch {
            setEventNotFound(true)
            toast({
                title: 'Error',
                description: 'An error occurred while fetching the event.'
            })
        }
    }

    useEffect(() => {
        getEvent()
    }, [])
    return (
        <div className="flex flex-col min-h-screen bg-purple-50">
            <header className="bg-purple-700 text-white py-4 px-6">
                <Link className="flex items-center space-x-2" href="#">
                    <span className="text-xl font-bold text-white-700">ConfirmMe</span>
                </Link>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    {eventNotFound ? (
                        <div className="p-6 text-center">
                            <h1 className="text-2xl font-semibold text-red-600">Event not found</h1>
                        </div>
                    ) : (
                        <div className="bg-purple-600 text-white p-6">
                            <Calendar className="w-12 h-12 mb-4" />
                            <h2 className="text-2xl font-semibold mb-2">Confirm Your Attendance</h2>
                            {event && (
                                <>
                                    <p className="text-purple-100">{event.title}</p>
                                    <p className="text-purple-200 text-sm">
                                        {event.dhStart
                                            ? format(new Date(event.dhStart), "dd MMMM yyyy, HH:mm", { locale: enUS })
                                            : "Date not available"}
                                    </p>
                                </>
                            )}
                        </div>
                    )}

                    {!isConfirmed && !eventNotFound ? (
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="Your Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" placeholder="@gmail.com" required />
                            </div>
                            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                Confirm
                            </Button>
                        </form>
                    ) : isConfirmed ? (
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-purple-600 mb-2">Presence confirmed!</h3>
                            <p className="text-gray-600">Thank you for confirming your participation in the event.</p>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    )
}