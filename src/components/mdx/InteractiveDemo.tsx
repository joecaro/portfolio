"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveDemoProps {
  title: string;
  children: React.ReactNode;
}

export function InteractiveDemo({ title, children }: InteractiveDemoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-8 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 bg-blue-50 dark:bg-blue-900 text-left flex justify-between items-center hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 