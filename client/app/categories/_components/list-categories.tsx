'use client'
import { ChevronRight, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { CreateCategorie } from "./create-categories"

export function ListCategories() {
    const categories = [
        { name: "Party", active: "Yes" },
        { name: "School", active: "Yes" },
        { name: "Games", active: "No" },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="bg-indigo-500 hover:bg-indigo-600 ml-auto">
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Create Categorie
                        </Button>
                    </SheetTrigger>
                    <CreateCategorie />
                </Sheet>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Active</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.name}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="secondary">{category.active}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" className="float-right">
                                        <ChevronRight className="h-4 w-4" />
                                        <span className="sr-only">Ver detalhes</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}