'use client'

import { motion } from 'framer-motion'
import { Shield, LogIn, UserPlus, Rocket } from 'lucide-react'
import Link from 'next/link'

export const RestrictedPage = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                staggerChildren: 0.07
            }
        }
    }

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 500, damping: 25 }
        }
    }

    const iconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1
            }
        }
    }

    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-900 flex items-center justify-center p-4">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center"
            >
                <motion.div variants={iconVariants} className="flex justify-center mb-6">
                    <Shield className="text-indigo-600 w-24 h-24" />
                </motion.div>
                <motion.h1 variants={childVariants} className="text-3xl font-bold mb-4 text-indigo-700">
                    Restricted Access
                </motion.h1>
                <motion.p variants={childVariants} className="text-lg mb-6 text-indigo-600">
                    You must be logged in to access this page.
                </motion.p>
                <motion.div variants={childVariants} className="space-y-4">
                    <Link href="/auth/login">
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="block w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium text-center transition duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <LogIn className="inline-block w-5 h-5 mr-2 -mt-1" />
                            Login
                        </motion.div>
                    </Link>
                    <br />
                    <Link href="/auth/signup">
                        <motion.div
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="block w-full py-3 px-4 bg-white text-indigo-600 rounded-lg font-medium text-center transition duration-300 ease-in-out border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <UserPlus className="inline-block w-5 h-5 mr-2 -mt-1" />
                            Sign Up
                        </motion.div>
                    </Link>
                </motion.div>
                <motion.div
                    variants={childVariants}
                    className="mt-8 text-indigo-500 flex items-center justify-center"
                >
                    <Rocket className="w-5 h-5 mr-2" />
                    <span>Join us on this space journey!</span>
                </motion.div>
            </motion.div>
        </div>
    )
}

