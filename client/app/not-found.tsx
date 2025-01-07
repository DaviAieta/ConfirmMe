import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          </div>
          <h1 className="relative text-9xl font-extrabold text-white animate-bounce">
            404
          </h1>
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
          Page not found
        </h2>
        <p className="mt-2 text-lg text-gray-100">
          Oops! It looks like you got lost along the way.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to main page
          </Link>
        </div>
      </div>
    </div>
  );
}
