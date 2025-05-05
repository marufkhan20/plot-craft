"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, ArrowLeft } from "lucide-react"
import DatabaseSetupForm from "@/components/DatabaseSetupForm"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-serif font-bold">PlotCraft Setup</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <DatabaseSetupForm />
        </motion.div>
      </div>
    </div>
  )
}
