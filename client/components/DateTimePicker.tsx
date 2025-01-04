"use client"

import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

type DateTimePickerProps = {
    onChange: (value: string) => void;
};

export function DateTimePicker({ onChange }: DateTimePickerProps) {
    const [date, setDate] = useState<Date>()
    const [selectedHour, setSelectedHour] = useState("12")
    const [selectedMinute, setSelectedMinute] = useState("00")

    // Atualiza o valor combinado ao mudar qualquer parte (data, hora ou minuto)
    useEffect(() => {
        if (date) {
            const dateTimeString = `${date.toISOString().split("T")[0]}T${selectedHour}:${selectedMinute}:00`;
            onChange(dateTimeString);
        }
    }, [date, selectedHour, selectedMinute]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "PPP") + ` ${selectedHour}:${selectedMinute}`
                    ) : (
                        <span>Select date and time</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="flex items-center justify-center p-3 border-t">
                    <Select value={selectedHour} onValueChange={setSelectedHour}>
                        <SelectTrigger className="w-[70px] mr-2">
                            <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                                    {hour.toString().padStart(2, '0')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="mx-1">:</span>
                    <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                        <SelectTrigger className="w-[70px] ml-2">
                            <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                                <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                                    {minute.toString().padStart(2, '0')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    )
}


