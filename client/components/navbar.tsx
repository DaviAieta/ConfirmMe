"use client";

import {
  Calendar,
  ChartColumnDecreasing,
  List,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { RestrictedPage } from "./RestrictedAccess";

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>
        <nav className="sticky top-0 flex flex-col bg-white shadow-xl p-5 border-100 border-gray-200 rounded-2xl">
          <div className="flex-row container mx-auto flex items-center justify-center">
            <Link
              className="flex items-center justify-center space-x-2"
              href="#"
            >
              <ChartColumnDecreasing className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-700 hover:text-indigo-600 ">
                ConfirmMe
              </span>
            </Link>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center space-x-6">
                <a
                  href="/events"
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <PartyPopper className="w-5 h-5 mr-1" />
                  Events
                </a>
                <a
                  href="/calendar"
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <Calendar className="w-5 h-5 mr-1" />
                  Calendar
                </a>
                <a
                  href="/categories"
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <List className="w-5 h-5 mr-1" />
                  Categories
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UserButton />
            </div>
          </div>
        </nav>
        <main className="flex flex-1 flex-col">{children}</main>
      </SignedIn>
      <SignedOut>
        <RestrictedPage />
      </SignedOut>
    </>
  );
};
