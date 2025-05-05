"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, Check, AlertCircle, Loader2 } from "lucide-react"
import Button from "@/components/ui/Button"

export default function DatabaseSetupForm() {
  const [databaseUrl, setDatabaseUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    // Validate the database URL format
    if (!databaseUrl.startsWith("postgresql://")) {
      setError("Invalid database URL format. It should start with postgresql://")
      setIsLoading(false)
      return
    }

    try {
      // In a real app, you would send this to your backend to test the connection
      // and set up the environment variable
      const response = await fetch("/api/setup-database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ databaseUrl }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to set up database")
      }

      // Show success message
      setSuccess(true)

      // In a real app, you might want to redirect or reload the page
      // to apply the new database connection
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <Database className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Database Setup</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Connect your Supabase or Neon database</p>
        </div>
      </div>

      {error && (
        <motion.div
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-start gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800 dark:text-red-300">Connection Error</h3>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div
          className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-start gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Check className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-300">Connection Successful</h3>
            <p className="text-sm text-green-600 dark:text-green-400">
              Database connected successfully! Reloading application...
            </p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="database-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Database URL
          </label>
          <input
            id="database-url"
            type="text"
            value={databaseUrl}
            onChange={(e) => setDatabaseUrl(e.target.value)}
            placeholder="postgresql://username:password@host:port/database"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Find this in your Supabase project under Settings → Database → Connection string, or in your Neon dashboard.
          </p>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>Connect Database</>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Help</h3>
        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 list-disc pl-4">
          <li>Make sure your database is publicly accessible or has the correct IP allowlist</li>
          <li>For Supabase, enable "Connection Pooling" for better performance</li>
          <li>For Neon, create a dedicated branch for your development environment</li>
          <li>
            After connecting, run{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">npx prisma db push</code> to create your
            tables
          </li>
        </ul>
      </div>
    </div>
  )
}
