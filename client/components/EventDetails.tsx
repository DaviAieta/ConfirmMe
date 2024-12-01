"use client"

import { CalendarIcon, MapPinIcon, TicketIcon, InfoIcon, ImageIcon, MapPin, Pencil, Delete, Link, Trash2, Dot, Ellipsis, EllipsisVertical, EllipsisVerticalIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlaceholder } from './ImagePlaceholder'
import Image from "next/image"
import { EventProps } from '@/app/events/types'
import { fetchAdapter } from '@/adapters/fetchAdapter'
import { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import AttendeesChart from './Chart'
import { Button } from './ui/button'
import { PreRegisterGuestDialog } from './PreRegisterDialog'
import { DeleteEventDialog } from './DeleteEventDialog'
import dinner from "../app/uploads/images/dinner.webp"
import meeting from "../app/uploads/images/meeting.webp"
import google from "../app/uploads/images/google.jpg"
import { EditEvent } from './EventEdit'
import { Spinner } from './Spinner'

export const EventDetails = ({ params }: { params: { uuid: string } }) => {
    const [event, setEvent] = useState<EventProps | null>(null)
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    const imageUrl = meeting

    const getEvent = async () => {
        try {
            const response = await fetchAdapter({
                method: 'GET',
                path: 'events/' + params.uuid
            })
            if (response.status == 200) {
                setEvent(response.data)
            }
        } catch {
            toast({
                variant: "destructive",
                title: "Error"
            })
        } finally {
            setLoading(false)
        }
    }

    const handleCopyLink = async (eventUuid: string) => {
        const link = `${window.location.origin}/events/confirm/${eventUuid}`;

        try {
            await navigator.clipboard.writeText(link);
            toast({
                title: "Link copied!",
                description: "The link was successfully copied to the clipboard."
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to copy the link. Please try again."
            });
        }
    }

    useEffect(() => {
        getEvent()
    }, [])

    if (loading) {
        return (
            <div className="min-h[400px] flex items-center justify-center">
                <Spinner />
            </div>
        )
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
                                <h1 className="text-3xl font-bold tracking-tight">{event?.title}</h1>
                                <p className="text-muted-foreground mb-6">{event?.description}</p>
                            </div>
                            <div className="flex gap-4">
                                <PreRegisterGuestDialog params={params} />
                                <Button onClick={() => handleCopyLink(String(event?.uuid))}>
                                    <Link className="h-4 w-4" />
                                </Button>
                                <DeleteEventDialog params={params} title={String(event?.title)} />
                                {event && <EditEvent event={event} params={params} />}
                            </div>
                        </div>
                        <div className="grid gap-2 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Date</p>
                                    <p className="text-sm text-muted-foreground">
                                        {event?.dhStart ? format(new Date(event.dhStart), 'dd/MM/yyyy', { locale: enUS }) : 'Unavailable Date'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Location</p>
                                    <p className="text-sm text-muted-foreground">{event?.address}</p>
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
                        <div className="mt-10 mb-4">
                            <div className="flex gap-2">

                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="aspect-video relative mb-3 rounded-lg overflow-hidden">
                                    <AttendeesChart
                                        confirmed={Number(event?.confirmed)}
                                        peopleLimit={Number(event?.peopleLimit)}
                                    />
                                </div>
                                <h3 className="font-semibold mb-2">{event?.title}</h3>
                                <div className="mt-4 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {event?.address}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarIcon className="h-4 w-4" />
                                        {event?.dhStart ? format(new Date(event.dhStart), 'dd/MM/yyyy', { locale: enUS }) : ' Unavailable Date'}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <TicketIcon className="h-4 w-4" />
                                        {event?.confirmed} / {event?.peopleLimit} confirmed
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
    )
}

