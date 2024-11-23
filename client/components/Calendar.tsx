"use client"

import React, { useState, useEffect } from "react"
import {
    formatDate,
} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { EventProps } from "@/app/events/types"

export const Calendar: React.FC = () => {
    const [events, setEvents] = useState<EventProps[]>([])

    const getEvents = async () => {
        try {
            const response = await fetchAdapter({
                method: 'GET',
                path: 'events'
            })
            if (response.status == 200) {
                setEvents(response.data)
            }
        } catch {
            console.log('error')
            // toast({
            //     title: 'Error'
            // })
            // setLoading(false);
        }
    }
    useEffect(() => {
        getEvents()
    }, [])

    const formattedEvents = events.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.dhStart?.split("T")[0], // Apenas a data, sem hora
        end: event.dhEnd?.split("T")[0],     // Apenas a data, sem hora
    }))

    return (
        <div>
            <div className="flex w-full px-10 justify-start items-start gap-8">
                <div className="w-3/12">
                    <div className="py-10 text-3xl px-7 text-3xl font-bold" >
                        Calendar Events
                    </div>
                    <ul className="space-y-4">
                        {events.length <= 0 && (
                            <div className="italic text-center text-gray-400">
                                No Events Present
                            </div>
                        )}

                        {events.length > 0 &&
                            events.map((event) => (
                                <li
                                    className="border border-gray-200 shadow px-4 py-2 rounded-md text-indigo-600"
                                    key={event.id}
                                >
                                    {event.title}
                                    <br />
                                    <label className="text-slate-950">
                                        {formatDate(event.dhStart!, {
                                            month: "long",
                                            day: "2-digit",
                                            hour: "2-digit"
                                        })}{" "}
                                    </label>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="w-9/12 mt-8">
                    <FullCalendar
                        height={"77vh"}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        dayMaxEvents={true}
                        initialEvents={
                            typeof window !== "undefined"
                                ? JSON.parse(localStorage.getItem("events") || "[]")
                                : []
                        }
                        events={formattedEvents} // Passando os eventos formatados sem hora
                    />
                </div>
            </div>

        </div>
    )
}
