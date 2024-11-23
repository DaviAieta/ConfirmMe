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
import { CreateCategory } from "./CategoryCreate"
import { CategoriesProps } from "../app/categories/types"
import { useEffect, useState } from "react"
import { fetchAdapter } from "@/adapters/fetchAdapter"
import { useToast } from "@/hooks/use-toast"

export function ListCategories() {
    const [categories, setCategories] = useState<CategoriesProps[]>([])
    const [loading, setLoading] = useState(true);
    const { toast } = useToast()

    const getCategories = async () => {
        try {
            const response = await fetchAdapter({
                method: 'GET',
                path: 'categories'
            })
            if (response.status == 200) {
                setCategories(response.data)
                setLoading(false)
            }
        } catch {
            toast({
                title: 'Error'
            })
            setLoading(false);
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="bg-indigo-500 hover:bg-indigo-600 ml-auto">
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Create Category
                        </Button>
                    </SheetTrigger>
                    <CreateCategory setCategories={setCategories} />
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
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.title}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="secondary">
                                        {category.active ? "Yes" : "No"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" className="float-right">
                                        <ChevronRight className="h-4 w-4" />
                                        <span className="sr-only">Details</span>
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