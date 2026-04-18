"use client";

import { motion } from "framer-motion";
import type { EnergyProvider } from "@/lib/providers";

interface ProviderCardProps {
  provider: EnergyProvider & { totalAnnualCost: number };
  index: number;
}

export default function ProviderCard({ provider, index }: ProviderCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatMonthly = (annual: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(annual / 12);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary-light transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent-blue rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {provider.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{provider.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(provider.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(provider.totalAnnualCost)}
          </div>
          <div className="text-sm text-gray-500">per jaar</div>
        </div>
      </div>

      {/* Price Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
        <div>
          <div className="text-sm text-gray-500">Stroomprijs</div>
          <div className="font-semibold text-gray-900">
            €{provider.pricePerKwh.toFixed(4)} / kWh
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Gasprijs</div>
          <div className="font-semibold text-gray-900">
            {provider.pricePerM3Gas > 0
              ? `€${provider.pricePerM3Gas.toFixed(2)} / m³`
              : "Geen gas"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Vaste kosten</div>
          <div className="font-semibold text-gray-900">
            {formatCurrency(provider.fixedMonthlyFee)} / maand
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Gemiddeld per maand</div>
          <div className="font-semibold text-gray-900">
            {formatMonthly(provider.totalAnnualCost)}
          </div>
        </div>
      </div>

      {/* Green Energy Badge */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Groene energie</span>
          <span className="text-sm font-semibold text-primary">
            {provider.greenEnergyPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-accent-blue h-2 rounded-full transition-all"
            style={{ width: `${provider.greenEnergyPercentage}%` }}
          />
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {provider.features.map((feature, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Contract Details */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>
          Contract: {provider.contractDurationMonths / 12} jaar
        </span>
        <span>Opzeggen: {provider.cancellationPeriodDays} dagen</span>
      </div>

      {/* CTA Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all"
      >
        Kies deze aanbieder
      </motion.button>
    </motion.div>
  );
}
