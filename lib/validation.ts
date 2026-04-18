import { z } from "zod";

// Nederlandse postcode validatie (1234 AB formaat)
export const postcodeSchema = z
  .string()
  .regex(/^\d{4}\s?[A-Z]{2}$/i, "Ongeldige postcode. Gebruik formaat: 1234 AB");

// Gas verbruik validatie
export const gasUsageSchema = z
  .number()
  .min(0, "Gasverbruik kan niet negatief zijn")
  .max(10000, "Gasverbruik lijkt onrealistisch hoog");

// Elektriciteit verbruik validatie
export const electricityUsageSchema = z
  .number()
  .min(0, "Stroomverbruik kan niet negatief zijn")
  .max(50000, "Stroomverbruik lijkt onrealistisch hoog");

// Complete calculator form schema
export const calculatorFormSchema = z.object({
  postcode: postcodeSchema,
  gasUsage: gasUsageSchema,
  electricityUsage: electricityUsageSchema,
});

// Helper functies
export function formatPostcode(value: string): string {
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  if (cleaned.match(/^\d{4}[A-Z]{2}$/)) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  return value;
}

export function isValidPostcode(value: string): boolean {
  return postcodeSchema.safeParse(value).success;
}

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;
