import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

export const Pricing = () => {
    const plans = [
        {
            name: "Silver",
            description: "For small events",
            price: 15,
            features: [
                "Up to 50 attendees",
                "Basic planning tools",
                "Email support",
                "1 event coordinator",
            ],
            popular: false,
        },
        {
            name: "Gold",
            description: "For medium events",
            price: 25,
            features: [
                "Up to 200 attendees",
                "Advanced planning tools",
                "Priority support",
                "2 event coordinators",
                "Custom branding",
            ],
            popular: true,
        },
        {
            name: "Diamond",
            description: "For large events",
            price: 40,
            features: [
                "Unlimited attendees",
                "Premium tools & analytics",
                "24/7 support",
                "5 event coordinators",
                "Custom integrations",
                "On-site support",
            ],
            popular: false,
        },
    ]

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-8 w-8" />
                <span className="sr-only">Back to main page</span>
            </Link>
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-3 text-xl text-gray-600">
                        Choose the plan thats right for your events
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className="relative flex flex-col">
                            <div className="flex-1 bg-gray-50 rounded-lg shadow-sm p-8 flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                                <p className="mt-2 text-gray-500">{plan.description}</p>
                                <p className="mt-8 text-5xl font-bold text-gray-900">${plan.price}</p>
                                <p className="mt-2 text-gray-500">per month</p>
                                <ul className="mt-8 space-y-4 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                                            <span className="ml-3 text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`mt-8 w-full py-3 px-4 rounded-md text-sm font-semibold transition-colors ${plan.popular
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                                    Most Popular
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}



