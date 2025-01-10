"use client";

import React from "react";
import { EventProps } from "@/app/events/types";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import Image from "next/image";

export const EventCard = ({
  event,
  isUpcoming,
}: {
  event: EventProps;
  isUpcoming: boolean;
}) => {
  const imageUrl = null;

  return (
    <div className="p-6 relative">
      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt="Dinner Event"
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
          </div>

          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
              isUpcoming
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isUpcoming ? "Upcoming Event" : "Past Event"}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {event.type === "ONLINE" ? (
            <span>{event.link}</span>
          ) : (
            <span>
              {event.address} {event.zipCode}
            </span>
          )}
        </div>
        <div className="flex items-center text-gray-600">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "UTC",
            }).format(new Date(event.dhStart))}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <Ticket className="w-4 h-4 mr-2" />
          <span>
            {event.confirmed} / {event.peopleLimit} confirmed
          </span>
        </div>
      </div>
    </div>
  );
};
