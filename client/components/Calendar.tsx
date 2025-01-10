"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { EventProps } from "@/app/events/types";
import { formatISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export const Calendar: React.FC = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const { toast } = useToast();

  const getEvents = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "events",
      });
      if (response.status == 200) {
        setEvents(response.data);
      } else {
        toast({
          title: String(response.status),
          description: response.data,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data || "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: formatISO(new Date(event.dhStart)),
    end: formatISO(new Date(event.dhEnd)),
  }));

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-10 text-3xl px-7 text-3xl font-bold">
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
                    {new Date(event.dhStart).toLocaleString("en-US", {
                      timeZone: "UTC",
                      month: "long",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
            timeZone="UTC"
            events={formattedEvents}
          />
        </div>
      </div>
    </div>
  );
};
