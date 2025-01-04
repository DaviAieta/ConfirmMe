import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, CheckCircle, BarChart, Sparkles } from "lucide-react"
import { ChartColumnDecreasing } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-900">
        <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-indigo-900 text-white">
          <Link className="flex items-center justify-center space-x-2" href="#">
            <ChartColumnDecreasing className="h-6 w-6" />
            <span className="ml-2 text-lg font-bold">ConfirmMe</span>
          </Link>
          <div>
            <SignedIn>
              <Link href="/events">
                <Button className="bg-white text-indigo-900 hover:bg-indigo-100 border-2">Go to Dashboard</Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="bg-white text-indigo-900 hover:bg-indigo-100">Login</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </header>
      </div>
      <main className="flex-1">
        <div className="bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-900">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-indigo-900 text-white">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Simplify Event Management
                  </h1>
                  <p className="mx-auto max-w-[700px] text-indigo-100 md:text-xl">
                    Register events, track attendance, and create amazing invitations with AI. All in one place.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <Link href="/auth/signup">
                    <Button className="bg-white text-indigo-900 hover:bg-indigo-100 mt-5">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-slate-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-indigo-900 dark:text-indigo-100">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-12 w-12 mb-4 text-indigo-600" />
                <h3 className="text-xl font-bold mb-2 text-indigo-900 dark:text-indigo-100">Event Registration</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Create and manage your events quickly and easily.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart className="h-12 w-12 mb-4 text-indigo-600" />
                <h3 className="text-xl font-bold mb-2 text-indigo-900 dark:text-indigo-100">Attendance Statistics</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Track the percentage of confirmations and attendances in real-time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Sparkles className="h-12 w-12 mb-4 text-indigo-600" />
                <h3 className="text-xl font-bold mb-2 text-indigo-900 dark:text-indigo-100">AI-Powered Invitations</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Create personalized and attractive invitations using artificial intelligence.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-indigo-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-indigo-900 dark:text-indigo-100">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-indigo-900 dark:text-indigo-100">Register Your Event</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Enter your event details into the platform.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-indigo-900 dark:text-indigo-100">Send Invitations</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Use our AI to create and send personalized invitations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-indigo-900 dark:text-indigo-100">Track Statistics</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  View in real-time who has confirmed attendance and showed up.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Simplify Your Events?
                </h2>
                <p className="mx-auto max-w-[600px] text-indigo-100 md:text-xl">
                  Join thousands of organizers who are already using ConfirmMe to manage their events with ease.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  )
}