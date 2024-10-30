import { Bell, Calendar, ChartColumn, ChartColumnDecreasing, CircleUser, LogOut, PartyPopper, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import Link from "next/link"

export const NavBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <nav className="bg-white shadow-lg p-5 border-100 border-gray-200 rounded-xl">
                <div className="container mx-auto flex items-center justify-between">
                    <Link className="flex items-center justify-center space-x-2" href="#">
                        <ChartColumnDecreasing className="h-6 w-6 text-indigo-600" />
                        <span className="text-xl font-bold text-gray-700 hover:text-indigo-600 ">ConfirmMe</span>
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center space-x-6">
                            <a href="#" className="flex items-center text-gray-700 hover:text-indigo-600">
                                <PartyPopper className="w-5 h-5 mr-1" />
                                Events
                            </a>
                            <a href="#" className="flex items-center text-gray-700 hover:text-indigo-600">
                                <Calendar className="w-5 h-5 mr-1" />
                                Calendar
                            </a>
                            <a href="#" className="flex items-center text-gray-700 hover:text-indigo-600">
                                <ChartColumn className="w-5 h-5 mr-1" />
                                Categories
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <CircleUser className="h-10 w-10" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel className="text-gray-700">Hello, </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/settings" passHref>
                                    <DropdownMenuItem asChild>
                                        <a>Settings</a>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/support" passHref>
                                    <DropdownMenuItem asChild>
                                        <a>Support</a>
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <Link href="/auth/login" passHref>
                                    <DropdownMenuItem asChild>
                                        <a>Login</a>
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/logout" passHref>
                                    <DropdownMenuItem asChild>
                                        <a>Logout</a>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>


            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </>
    )
}
