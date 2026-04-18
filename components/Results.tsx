"use client";

import { motion } from "framer-motion";
import ProviderCard from "./ProviderCard";
import type { EnergyProvider } from "@/lib/providers";

interface ResultsProps {
  providers: Array<EnergyProvider & { totalAnnualCost: number }>;
  onReset: () => void;
}

export default function Results({ providers, onReset }: ResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
      aria-live="polite"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {providers.length} aanbieders gevonden
        </h2>
        <p className="text-gray-600">
          Gesorteerd op laagste totale kosten
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {providers.map((provider, index) => (
          <ProviderCard key={provider.id} provider={provider} index={index} />
        ))}
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          aria-label="Opnieuw zoeken"
          className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
        >
          Opnieuw zoeken
        </motion.button>
      </div>
    </motion.div>
  );
}
