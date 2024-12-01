"use client"

import { fetchAdapter } from "@/adapters/fetchAdapter"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export const DeleteEventDialog = ({ params, title }: { params: { uuid: string }, title: string }) => {
    const { toast } = useToast()
    const router = useRouter()

    const handleDeleteEvent = async (e: any) => {
        e.preventDefault()

        try {
            const response = await fetchAdapter({
                method: "POST",
                path: "events/delete",
                body: {
                    uuid: params.uuid
                }
            })
            if (response.status == 200) {
                toast({
                    title: "Event deleted",
                })
                router.push("/events")
            }
        } catch {
            toast({
                variant: "destructive",
                title: "Error",
            })
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Trash2 className="h-3 w-3" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[490px] h-[130px]">
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete the {title} event?
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleDeleteEvent}>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="w-full" type="button" variant="outline">
                                No
                            </Button>
                        </DialogClose>
                        <Button className="w-full" type="submit" variant="destructive">
                            Yes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}