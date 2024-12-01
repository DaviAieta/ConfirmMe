"use client"

import { ImageIcon } from "lucide-react"

export const ImagePlaceholder = ({ className }: { className?: string }) => {
    return (
        <div className={`flex items-center justify-center bg-muted ${className}`}>
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
    )
}
