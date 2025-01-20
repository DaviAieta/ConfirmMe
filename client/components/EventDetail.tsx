"use client";

import { CalendarIcon, MapPinIcon, TicketIcon, Link2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlaceholder } from "./ImagePlaceholder";
import Image from "next/image";
import { EventProps } from "@/app/events/types";
import { fetchAdapter } from "@/adapters/fetchAdapter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AttendeesChart from "./Chart";
import { Button } from "./ui/button";
import { PreRegisterGuestDialog } from "./PreRegistrationDialog";
import { DeleteEventDialog } from "./DeleteEventDialog";
import { EditEvent } from "./EditEvent";
import { Spinner } from "./Spinner";
import { use } from "react";
import { GuestList } from "./GuestList";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export const EventDetails = ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { userId } = useAuth();

  const imageUrl = null;

  const getEvent = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "events/" + resolvedParams.uuid,
        headers: { Authorization: `Bearer ${userId}` },
      });
      if (response.status == 200) {
        setEvent(response.data);
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

  const handleCopyLink = async (eventUuid: string) => {
    const link = `${window.location.origin}/events/confirm/${eventUuid}`;

    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "Link copied!",
        description: "The link was successfully copied to the clipboard.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy the link. Please try again.",
      });
    }
  };

  useEffect(() => {
    getEvent();
  }, [resolvedParams.uuid]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <Link href="/events" className="text-blue-500 hover:underline">
          Return to events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Event hero image"
            className="object-cover brightness-75"
            fill
            priority
          />
        ) : (
          <ImagePlaceholder className="h-full w-full" />
        )}
      </div>

      <div className="container px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {event?.title}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {event?.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <PreRegisterGuestDialog params={resolvedParams} />
                <Button onClick={() => handleCopyLink(String(event?.uuid))}>
                  <Link2 className="h-4 w-4" />
                </Button>
                <DeleteEventDialog
                  resolvedParams={resolvedParams}
                  title={String(event?.title)}
                />
                {event && (
                  <EditEvent event={event} resolvedParams={resolvedParams} />
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {event?.dhStart
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                          timeZone: "UTC",
                        }).format(new Date(event.dhStart))
                      : "Unavailable Date"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  {event?.type === "ONLINE" ? (
                    <a
                      href={event?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-indigo-500 underline break-all"
                    >
                      {event?.link}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {event?.address} {event?.zipCode}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Confirmed</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {event?.confirmed} / {event?.peopleLimit} Confirmed
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <GuestList eventUuid={event?.uuid || ""} />
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="sticky top-6">
              <Card>
                <CardContent className="p-4 sm:p-6 flex flex-col items-center">
                  <div className="flex justify-center items-center w-full h-full">
                    <AttendeesChart
                      confirmed={Number(event?.confirmed)}
                      peopleLimit={Number(event?.peopleLimit)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
