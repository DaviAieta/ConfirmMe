"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CreateEvents } from "./CreateEvent";
import { EventProps } from "../app/events/types";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "./Spinner";
import { Input } from "./ui/input";
import Link from "next/link";
import { EventCard } from "./EventCard";

export function ListEvents() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getEvents = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "events",
      });
      if (response.status === 200) {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const filteredEvent = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentDateUTC = new Date(Date.now());
  const upcomingEvents = filteredEvent.filter(
    (event) => new Date(event.dhStart).getTime() >= currentDateUTC.getTime()
  );
  const pastEvents = filteredEvent.filter(
    (event) => new Date(event.dhStart).getTime() < currentDateUTC.getTime()
  );

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen p-4">
        <main className="bg-white rounded-lg p-6 md:p-10 w-full max-w-md md:max-w-2xl text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            No events have been created yet
          </h1>
          <div className="mt-5">
            <CreateEvents setEvents={setEvents} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events..."
              className="w-full py-2 px-4 pl-10 bg-white rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Upcoming Events
              </h1>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                See My Events
              </p>
            </div>
            <CreateEvents setEvents={setEvents} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {upcomingEvents.map((event) => (
              <Link key={event.uuid} href={`/events/${event.uuid}`}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative h-full">
                  <EventCard event={event} isUpcoming={true} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Past Events
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              See My Past Events
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4">
              {pastEvents.map((event) => (
                <Link key={event.uuid} href={`/events/${event.uuid}`}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden relative h-full">
                    <EventCard event={event} isUpcoming={false} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
