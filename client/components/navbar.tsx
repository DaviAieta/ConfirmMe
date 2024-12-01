import { Calendar, ChartColumn, ChartColumnDecreasing, PartyPopper } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export const NavBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <nav className="sticky top-0 z-50 flex flex-col bg-white shadow-xl p-5 border-100 border-gray-200 rounded-2xl">
                <div className="flex-row container mx-auto flex items-center justify-between">
                    <Link className="flex items-center justify-center space-x-2" href="#">
                        <ChartColumnDecreasing className="h-6 w-6 text-indigo-600" />
                        <span className="text-xl font-bold text-gray-700 hover:text-indigo-600 ">ConfirmMe</span>
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center space-x-6">
                            <a href="/events" className="flex items-center text-gray-700 hover:text-indigo-600">
                                <PartyPopper className="w-5 h-5 mr-1" />
                                Events
                            </a>
                            <a href="/calendar" className="flex items-center text-gray-700 hover:text-indigo-600">
                                <Calendar className="w-5 h-5 mr-1" />
                                Calendar
                            </a>
                        </div>
                    </div>
                    <div>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <div className="flex items-center space-x-4">
                                <SignInButton mode="modal" >
                                    <Button className="bg-gray-100 text-gray-800 px-3 py-1.5
                                    text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                                        Sign In
                                    </Button>
                                </SignInButton>
                            </div>
                        </SignedOut>
                    </div>
                </div>
            </nav>

            <SignedIn>
                <main className="flex flex-1 flex-col">
                    {children}
                </main>
            </SignedIn>

        </>
    )
}
