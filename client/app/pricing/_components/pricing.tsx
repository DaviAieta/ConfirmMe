"use client"

import { InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toggle } from "@/components/ui/toggle"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const Pricing = () => {
    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        Boost Your Events
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Boost your ability to manage your events with ConfirmMe
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-gray-200">
                        <CardHeader>
                            <h3 className="text-xl font-bold">Monthly</h3>

                            <div className="mt-4">
                                <span className="text-4xl font-bold">$39.90/</span>
                                <span className="text-gray-600 ml-1">month</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Button className="w-full" variant="outline">
                                Choose Monthly
                            </Button>
                            <div className="space-y-4">
                                <p className="font-semibold">Create plan includes:</p>
                                <ul className="space-y-3">
                                    {[
                                        "Test",
                                        "Test",
                                        "Test",
                                        "Test",
                                        "Test"
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <div className="h-2 w-2 bg-black rounded-full" />
                                            <span className="flex-1">{feature}</span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <InfoIcon className="h-4 w-4 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Feature information</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-400 relative">
                        <div className="absolute -top-3 right-4 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                            Recommended
                        </div>
                        <CardHeader>
                            <h3 className="text-xl font-bold">Annual</h3>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$478.80/</span>
                                <span className="text-gray-600">year</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                Choose Annual
                            </Button>
                            <div className="space-y-4">
                                <p className="font-semibold">All Create features plus:</p>
                                <ul className="space-y-3">
                                    {[
                                        "Test",
                                        "Test",
                                        "Test",
                                        "Test",
                                        "Test"
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <div className="h-2 w-2 bg-purple-600 rounded-full" />
                                            <span className="flex-1">{feature}</span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <InfoIcon className="h-4 w-4 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Feature information</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}