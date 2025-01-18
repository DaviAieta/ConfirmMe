"use client";

import {
  Calendar,
  ChartColumnDecreasing,
  List,
  Menu,
  PartyPopper,
  X,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { RestrictedPage } from "./RestrictedAccess";
import { useState } from "react";

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <SignedIn>
        <nav className="sticky top-0 z-50 bg-white shadow-xl p-4 md:p-5 border-gray-200 rounded-2xl">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <ChartColumnDecreasing className="h-6 w-6 text-indigo-600 mr-2" />
              <Link href="/events">
                <span className="text-xl font-bold text-gray-700">
                  TheConfirmMe
                </span>
              </Link>
            </div>
            <button
              className="md:hidden inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="hidden md:flex items-center space-x-6">
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
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:hidden w-full mt-4`}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/events"
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <PartyPopper className="w-5 h-5 mr-1" />
                  Events
                </Link>
                <Link
                  href="/calendar"
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <Calendar className="w-5 h-5 mr-1" />
                  Calendar
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <List className="w-5 h-5 mr-1" />
                  Categories
                </Link>
                <div className="pt-4">
                  <UserButton />
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
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
