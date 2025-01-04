'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Rocket, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export const SignInPage = () => {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            })

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId })
                router.push('/events')
            } else {
                console.error('Login failed', result)
                setError('Login failed. Please check your credentials and try again.')
            }
        } catch (err: any) {
            console.error('Error during login:', err)
            setError(err.errors[0]?.longMessage || 'An error occurred during login')
        }
    }

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-900 flex items-center justify-center p-4">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <motion.div variants={childVariants} className="flex justify-center mb-6">
                    <Rocket className="text-indigo-600 w-16 h-16" />
                </motion.div>
                <motion.h2 variants={childVariants} className="text-3xl font-bold mb-6 text-indigo-700 text-center">
                    Welcome Back
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={childVariants}>
                        <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full px-4 py-3 bg-indigo-50 border border-indigo-300 rounded-lg text-indigo-700 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition duration-150 ease-in-out pl-11"
                                placeholder="your@email.com"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 w-5 h-5" />
                        </div>
                    </motion.div>
                    <motion.div variants={childVariants}>
                        <label htmlFor="password" className="block text-sm font-medium text-indigo-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full px-4 py-3 bg-indigo-50 border border-indigo-300 rounded-lg text-indigo-700 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           transition duration-150 ease-in-out pl-11"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 w-5 h-5" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </motion.div>
                    {error && (
                        <motion.p
                            variants={childVariants}
                            className="text-red-500 text-sm mt-2 text-center"
                        >
                            {error}
                        </motion.p>
                    )}
                    <motion.div variants={childVariants}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                            <Rocket className="w-5 h-5 mr-2" />
                            Launch Your Session
                        </motion.button>
                    </motion.div>
                </form>
                <motion.p variants={childVariants} className="mt-4 text-center text-sm text-indigo-500">
                    Don't have an account?{" "}
                    <a href="/auth/signup" className="font-medium text-indigo-700 hover:text-indigo-800 transition duration-150 ease-in-out">
                        Sign up
                    </a>
                </motion.p>
            </motion.div>
        </div>
    )
}
