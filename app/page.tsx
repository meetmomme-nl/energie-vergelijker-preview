"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Calculator from "@/components/Calculator";
import Results from "@/components/Results";
import { getProvidersSortedByCost } from "@/lib/providers";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calculatorData, setCalculatorData] = useState<{
    postcode: string;
    gasUsage: number;
    electricityUsage: number;
  } | null>(null);

  const handleCalculatorSubmit = (data: {
    postcode: string;
    gasUsage: number;
    electricityUsage: number;
  }) => {
    setIsLoading(true);
    setCalculatorData(data);

    // Simulate calculation delay
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleReset = () => {
    setShowResults(false);
    setCalculatorData(null);
  };

  const sortedProviders = calculatorData
    ? getProvidersSortedByCost(calculatorData.gasUsage, calculatorData.electricityUsage)
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent-blue rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">EnergieVergelijker</h1>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-primary font-medium hover:bg-green-50 rounded-lg transition-all"
          >
            Contact
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <AnimatePresence>
        {!showResults && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="py-16 px-4"
          >
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Vergelijk{" "}
                <span className="bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                  energieaanbieders
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600"
              >
                Bespaar op uw gas en stroom met onze slimme vergelijker
              </motion.p>
            </div>

            <Calculator onSubmit={handleCalculatorSubmit} isLoading={isLoading} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && calculatorData && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 px-4"
            aria-live="polite"
            aria-busy={isLoading}
          >
            <Results providers={sortedProviders} onReset={handleReset} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">EnergieVergelijker</h3>
              <p className="text-sm text-gray-600">
                Uw onafhankelijke vergelijker voor gas en stroom.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Voorwaarden
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <p className="text-sm text-gray-600">
                Heeft u vragen? Neem gerust contact met ons op.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} EnergieVergelijker. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>
    </main>
  );
}
