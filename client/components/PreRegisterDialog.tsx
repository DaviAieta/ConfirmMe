"use client"

import { fetchAdapter } from "@/adapters/fetchAdapter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export const PreRegisterGuestDialog = ({ params }: { params: { uuid: string } }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const { toast } = useToast()


    const handlePreRegister = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetchAdapter({
                method: "POST",
                path: "guests/pre-register",
                body: {
                    name,
                    email,
                    uuid: params.uuid
                }
            })
            console.log(response.data)
            if (response.status == 200) {
                toast({
                    title: "Pre Register successfully",
                    description: `Guest: ${name}`
                })
            } else {
                toast({
                    title: String(response.status),
                    description: response.data
                })
            }
        } catch (error: any) {
            const errorMessage = error.response?.data || "An unexpected error occurred.";
            toast({
                variant: "destructive",
                title: errorMessage,
            })
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Pre-Register Your Guest</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>Pre-Register</DialogTitle>
                    <DialogDescription>
                        Pre-register your guest by filling in the fields below
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePreRegister}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input className="col-span-3" value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                E-mail
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Send Pre-Register</Button>
                    </DialogFooter>
                </form >
            </DialogContent>
        </Dialog >

    )
}