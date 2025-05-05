"use client";

import PlotCard from "@/components/dashboard/PlotCard";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import { Book, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mock data for plots
const mockPlots = [
  {
    id: "1",
    title: "The Crystal Kingdoms",
    description:
      "In the mystical realm of Etherium, a young alchemist named Elara discovers a rare crystal with the power to bridge worlds.",
    genre: "Fantasy",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    chapter_count: 5,
    word_count: 12500,
  },
  {
    id: "2",
    title: "Nebula's Edge",
    description:
      "When a mysterious signal is detected from the edge of the galaxy, Captain Aria must lead her crew on a dangerous mission to investigate.",
    genre: "Science Fiction",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    chapter_count: 10,
    word_count: 25000,
  },
  {
    id: "3",
    title: "Whispers in the Dark",
    description:
      "Detective Morgan Chase must solve a series of cryptic murders before the killer strikes again, uncovering dark secrets about the city's past.",
    genre: "Mystery",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    chapter_count: 15,
    word_count: 37500,
  },
];

export default function MyBooks() {
  const router = useRouter();
  const [plots, setPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlots(mockPlots);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">
          My Books
        </h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="primary"
            onClick={() => router.push("/generator")}
            icon={<Plus className="h-5 w-5" />}
          >
            New Book
          </Button>
        </motion.div>
      </div>

      {plots.length === 0 ? (
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-12 text-center">
            <Book className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No books yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start creating your first book with our AI-powered generator.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                variant="primary"
                onClick={() => router.push("/generator")}
              >
                Create Your First Book
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plots.map((plot, index) => (
            <motion.div
              key={plot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PlotCard plot={plot} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
