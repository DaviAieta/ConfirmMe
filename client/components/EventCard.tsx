import React from "react"
import { EventProps } from "@/app/events/types"
import { CalendarDays, MapPin, Ticket } from "lucide-react"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"

export const EventCard = ({ event }: { event: EventProps }) => {
    const imageUrl = 0
    return (

        <div className={`p-6 ${imageUrl ? "relative" : ""}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex flex-col items-start gap-2">
                        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                    </div>

                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">New Event</span>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span>
                        {format(new Date(event.dhStart), 'MM/dd/yyyy', { locale: enUS })}
                    </span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Ticket className="w-4 h-4 mr-2" />
                    <span>{event.peopleLimit - event.confirmed} / {event.peopleLimit} available</span>
                </div>
                <p className="mt-4 text-gray-600 text-sm line-clamp-2">
                    {event.description}
                </p>
            </div>
        </div>
    )
}