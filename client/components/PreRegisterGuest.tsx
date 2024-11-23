"use client"

import { fetchAdapter } from "@/adapters/fetchAdapter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export const PreRegister = ({ params }: { params: { uuid: string } }) => {
    const [name, setName] = useState("")
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

    const handlPreRegister = async (e: any) => {
        e.preventDefault()

        try {
            const response = await fetchAdapter({
                method: "POST",
                path: "guests/pre-register",
                body: {
                    name,
                    phone,
                    uuid: params.uuid
                }
            })
            if (response.status == 200) {
                toast({
                    title: "Pre Register successfully",
                    description: `Guest: ${name}`
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <SheetContent >
            <SheetHeader>
                <SheetTitle>Create Guest</SheetTitle>
                <SheetDescription>Fill in the fields to add a new guest</SheetDescription>
            </SheetHeader>
            <form onSubmit={handlPreRegister}>
                <div className="grid gap-4 py-4">
                    < div className="grid grid-cols-4 items-center gap-4" >
                        <Label htmlFor="title" className="text-right">
                            Name
                        </Label>
                        <Input id="name" className="col-span-3" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </div >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={handlePhoneChange}
                            className="col-span-3"
                            placeholder="(555) 555-5555"
                        />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>When you click on Pre Register you will send an SMS to your guest</span>
                    </div>
                </div >
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600" >
                            Pre Register
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </form >
        </SheetContent >
    )
}