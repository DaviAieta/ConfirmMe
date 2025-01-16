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

export const EventDetails = ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<EventProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const imageUrl = null;

  const getEvent = async () => {
    try {
      const response = await fetchAdapter({
        method: "GET",
        path: "events/" + resolvedParams.uuid,
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
      <div className="min-h[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <Link href="/events" className="text-blue-500 hover:underline">
          Comeback to events
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[300px] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
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
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {event?.title}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {event?.description}
                </p>
              </div>
              <div className="flex gap-4">
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
            <div className="grid gap-2 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">
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
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  {event?.type === "ONLINE" ? (
                    <a
                      href={event?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 underline"
                    >
                      {event?.link}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">
                      {event?.address} {event?.zipCode}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Confirmed</p>
                  <p className="text-sm text-muted-foreground">
                    {event?.confirmed} / {event?.peopleLimit} Confirmed
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <GuestList eventUuid={event?.uuid || ""} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
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
  );
};
