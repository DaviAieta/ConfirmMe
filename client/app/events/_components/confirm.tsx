'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, CheckCircle, Info, LockKeyhole, MapPin, PartyPopper, Phone, Shield } from "lucide-react"
import { EventProps } from '../types'
import { fetchAdapter } from '@/adapters/fetchAdapter'
import { useToast } from "@/hooks/use-toast"
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const countryCodes = [
    { code: '+1', country: 'US' },
]
export const ConfirmAttendance = ({ params }: { params: { uuid: string } }) => {
    const [isVerified, setIsVerified] = useState(false)
    const [verificationStep, setVerificationStep] = useState(1)
    const [verificationCode, setVerificationCode] = useState("")
    const [countryCode, setCountryCode] = useState('+1')
    const [codeSent, setCodeSent] = useState(false)
    const [event, setEvent] = useState<EventProps | null>(null)
    const [eventNotFound, setEventNotFound] = useState(false)
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const { toast } = useToast()

    const formatPhoneNumber = (value: string) => {
        const phoneNumber = value.replace(/[^\d]/g, '')
        const phoneNumberLength = phoneNumber.length
        if (phoneNumberLength < 4) return phoneNumber
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(e.target.value)
        setPhone(formattedPhone)
    }

    const handleSendVerificationCode = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetchAdapter({
                method: "POST",
                path: "guests/send-code",
                body: {
                    phone
                }
            })
            if (response.status == 200) {
                toast({
                    title: "code sent",
                    description: "Verify your SMS."
                });
                setCodeSent(true)
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to send code."
            });
        }
    }


    const getEvent = async () => {
        try {
            const response = await fetchAdapter({
                method: "GET",
                path: `events/${params.uuid}`
            })
            if (response.status === 200 && response.data) {
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
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            {verificationStep === 1 && (
                <div className="flex min-h-screen bg-gray-100">
                    <div className="flex-1 hidden lg:block bg-primary">
                        <div className="flex flex-col justify-center items-center h-full text-white space-y-8">
                            <PartyPopper className="w-24 h-24" />
                            <h1 className="text-4xl font-bold text-center">Confirm Your Number</h1>
                            <p className="text-xl text-center max-w-md">
                                Verify your phone number to confirm your attendance at the party.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-8">
                        <Card className="w-full max-w-2xl">
                            <CardHeader>
                                <div className="flex items-center space-x-2">
                                    <Phone className="w-6 h-6 text-primary" />
                                    <CardTitle className="text-2xl font-bold">Phone Verification</CardTitle>
                                </div>
                                <CardDescription>Enhance your account security with phone verification</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="send" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="send">Send Code</TabsTrigger>
                                        <TabsTrigger value="verify" disabled={!codeSent}>Verify Code</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="send">
                                        <form onSubmit={handleSendVerificationCode} className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-sm font-medium">
                                                    Phone Number
                                                </Label>
                                                <div className="flex">
                                                    <Select value={countryCode} onValueChange={setCountryCode}>
                                                        <SelectTrigger className="w-[140px]">
                                                            <SelectValue placeholder="Country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {countryCodes.map((country) => (
                                                                <SelectItem key={country.code} value={country.code}>
                                                                    {country.code} {country.country}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        required
                                                        value={phone}
                                                        onChange={handlePhoneChange}
                                                        className="flex-1 ml-2"
                                                        placeholder="(555) 555-5555"
                                                    />
                                                </div>
                                            </div>
                                            <Button type="submit" className="w-full">
                                                Send Verification Code
                                            </Button>
                                        </form>
                                    </TabsContent>
                                    <TabsContent value="verify">
                                        <form className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="verificationCode" className="text-sm font-medium">
                                                    Verification Code
                                                </Label>
                                                <Input
                                                    id="verificationCode"
                                                    name="verificationCode"
                                                    type="text"
                                                    required
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                    className="w-full"
                                                    placeholder="Enter 6-digit code"
                                                    maxLength={6}
                                                />
                                            </div>
                                            <Button type="submit" className="w-full">
                                                Verify Code
                                            </Button>
                                        </form>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Shield className="w-4 h-4" />
                                    <span>Your phone number is securely stored and will not be shared.</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Info className="w-4 h-4" />
                                    <span>
                                        By continuing, you agree to our{' '}
                                        <a href="#" className="underline underline-offset-2 hover:text-primary">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="underline underline-offset-2 hover:text-primary">
                                            Privacy Policy
                                        </a>
                                        .
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}

            {verificationStep === 2 && (
                <div className="flex flex-col lg:flex-row min-h-screen">
                    <div className="lg:w-2/3 relative overflow-hidden bg-gray-700">
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start lg:p-12">
                            <div className="text-white space-y-2 max-w-2xl mb-8">
                                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{event?.title}</h1>
                                <p className="text-xl lg:text-2xl font-light">{event?.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 flex flex-col justify-between p-8 lg:p-12">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">{event?.title}</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <span>
                                            {event?.dhStart
                                                ? format(new Date(event?.dhStart), "dd MMMM yyyy, HH:mm", { locale: enUS })
                                                : "Date not available"}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                        <span>{event?.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">Confirm Your Attendance</h2>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf" className="text-sm font-medium">
                                            CPF
                                        </Label>
                                        <Input
                                            id="cpf"
                                            name="cpf"
                                            type="number"
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-medium">
                                            Phone
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="phone"
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Confirm Attendance
                                    </Button>
                                    <Button type="button" className="w-full" variant={"destructive"}>
                                        Reject Attendance
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-8">
                            For any questions, please contact us at events@email.com or call +1 (555) 123-4567
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
