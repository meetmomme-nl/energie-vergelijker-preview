"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { isValidPostcode, formatPostcode } from "@/lib/validation";

interface CalculatorProps {
  onSubmit: (data: { postcode: string; gasUsage: number; electricityUsage: number }) => void;
  isLoading: boolean;
}

export default function Calculator({ onSubmit, isLoading }: CalculatorProps) {
  const [postcode, setPostcode] = useState("");
  const [gasUsage, setGasUsage] = useState("");
  const [electricityUsage, setElectricityUsage] = useState("");
  const [errors, setErrors] = useState<{ postcode?: string; gasUsage?: string; electricityUsage?: string }>({});

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    const formatted = formatPostcode(value);
    setPostcode(formatted);
    
    if (value && !isValidPostcode(formatted)) {
      setErrors((prev) => ({ ...prev, postcode: "Ongeldige postcode" }));
    } else {
      setErrors((prev) => ({ ...prev, postcode: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!isValidPostcode(postcode)) {
      newErrors.postcode = "Ongeldige postcode. Gebruik formaat: 1234 AB";
    }

    const gasNum = parseFloat(gasUsage);
    if (!gasUsage || isNaN(gasNum) || gasNum < 0) {
      newErrors.gasUsage = "Voer een geldig gasverbruik in";
    } else if (gasNum > 10000) {
      newErrors.gasUsage = "Gasverbruik lijkt onrealistisch hoog";
    }

    const electricityNum = parseFloat(electricityUsage);
    if (!electricityUsage || isNaN(electricityNum) || electricityNum < 0) {
      newErrors.electricityUsage = "Voer een geldig stroomverbruik in";
    } else if (electricityNum > 50000) {
      newErrors.electricityUsage = "Stroomverbruik lijkt onrealistisch hoog";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      postcode,
      gasUsage: gasNum,
      electricityUsage: electricityNum,
    });
  };

  const isFormValid = isValidPostcode(postcode) && gasUsage && electricityUsage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Bereken uw energiekosten
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isLoading}>
        {/* Postcode */}
        <div>
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
            Postcode
          </label>
          <input
            type="text"
            id="postcode"
            value={postcode}
            onChange={handlePostcodeChange}
            placeholder="1234 AB"
            aria-invalid={!!errors.postcode}
            aria-describedby={errors.postcode ? "postcode-error" : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none ${
              errors.postcode
                ? "border-red-500 focus:border-red-600"
                : isValidPostcode(postcode)
                ? "border-green-500 focus:border-green-600"
                : "border-gray-200 focus:border-primary"
            }`}
            maxLength={7}
          />
          {errors.postcode && (
            <p id="postcode-error" className="mt-1 text-sm text-red-600">{errors.postcode}</p>
          )}
          {isValidPostcode(postcode) && (
            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Geldige postcode
            </p>
          )}
        </div>

        {/* Gas Usage */}
        <div>
          <label htmlFor="gasUsage" className="block text-sm font-medium text-gray-700 mb-2">
            Jaarlijks gasverbruik (m³)
          </label>
          <input
            type="number"
            id="gasUsage"
            value={gasUsage}
            onChange={(e) => {
              setGasUsage(e.target.value);
              setErrors((prev) => ({ ...prev, gasUsage: undefined }));
            }}
            placeholder="Bijv. 1500"
            min="0"
            max="10000"
            aria-invalid={!!errors.gasUsage}
            aria-describedby={errors.gasUsage ? "gasUsage-error" : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none ${
              errors.gasUsage
                ? "border-red-500 focus:border-red-600"
                : "border-gray-200 focus:border-primary"
            }`}
          />
          {errors.gasUsage && (
            <p id="gasUsage-error" className="mt-1 text-sm text-red-600">{errors.gasUsage}</p>
          )}
        </div>

        {/* Electricity Usage */}
        <div>
          <label htmlFor="electricityUsage" className="block text-sm font-medium text-gray-700 mb-2">
            Jaarlijks stroomverbruik (kWh)
          </label>
          <input
            type="number"
            id="electricityUsage"
            value={electricityUsage}
            onChange={(e) => {
              setElectricityUsage(e.target.value);
              setErrors((prev) => ({ ...prev, electricityUsage: undefined }));
            }}
            placeholder="Bijv. 2800"
            min="0"
            max="50000"
            aria-invalid={!!errors.electricityUsage}
            aria-describedby={errors.electricityUsage ? "electricityUsage-error" : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none ${
              errors.electricityUsage
                ? "border-red-500 focus:border-red-600"
                : "border-gray-200 focus:border-primary"
            }`}
          />
          {errors.electricityUsage && (
            <p id="electricityUsage-error" className="mt-1 text-sm text-red-600">{errors.electricityUsage}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isFormValid || isLoading}
          whileTap={{ scale: 0.98 }}
          aria-label="Vergelijk energieaanbieders"
          className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-all ${
            isFormValid && !isLoading
              ? "bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Berekenen..." : "Vergelijk aanbieders"}
        </motion.button>
      </form>
    </motion.div>
  );
}
