import { Github, Linkedin } from 'lucide-react'
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="py-2 bg-gray-100 fixed bottom-0 left-0 right-0 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                    <span>Developed by Davi Aieta Carvalho</span>
                    <Link
                        href="https://www.linkedin.com/in/davi-aieta/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-800 transition-colors"
                    >
                        <Linkedin size={16} />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                        href="https://github.com/DaviAieta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-800 transition-colors"
                    >
                        <Github size={16} />
                        <span className="sr-only">GitHub</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

