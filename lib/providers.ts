export interface EnergyProvider {
  id: string;
  name: string;
  logo: string;
  pricePerKwh: number; // € per kWh
  pricePerM3Gas: number; // € per m³ gas
  fixedMonthlyFee: number; // € per maand
  greenEnergyPercentage: number; // 0-100
  contractDurationMonths: number; // 12, 36, 60
  cancellationPeriodDays: number; // 30
  rating: number; // 1-5 sterren
  features: string[];
}

export const providers: EnergyProvider[] = [
  {
    id: "vattenfall",
    name: "Vattenfall",
    logo: "/logos/vattenfall.svg",
    pricePerKwh: 0.38,
    pricePerM3Gas: 1.25,
    fixedMonthlyFee: 12.5,
    greenEnergyPercentage: 85,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 4.2,
    features: ["Groot aanbod", "Online klantenservice"],
  },
  {
    id: "essent",
    name: "Essent",
    logo: "/logos/essent.svg",
    pricePerKwh: 0.36,
    pricePerM3Gas: 1.2,
    fixedMonthlyFee: 15.0,
    greenEnergyPercentage: 60,
    contractDurationMonths: 36,
    cancellationPeriodDays: 30,
    rating: 3.9,
    features: ["Lange contractkorting", "24/7 support"],
  },
  {
    id: "eneco",
    name: "Eneco",
    logo: "/logos/eneco.svg",
    pricePerKwh: 0.4,
    pricePerM3Gas: 1.3,
    fixedMonthlyFee: 10.0,
    greenEnergyPercentage: 100,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 4.5,
    features: ["100% groene energie", "Lokaal opgewekt"],
  },
  {
    id: "greenchoice",
    name: "Greenchoice",
    logo: "/logos/greenchoice.svg",
    pricePerKwh: 0.35,
    pricePerM3Gas: 1.15,
    fixedMonthlyFee: 8.5,
    greenEnergyPercentage: 100,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 4.3,
    features: ["Goedkoopste groene", "Zonne-energie"],
  },
  {
    id: "budgetthuis",
    name: "Budgetthuis",
    logo: "/logos/budgetthuis.svg",
    pricePerKwh: 0.33,
    pricePerM3Gas: 1.1,
    fixedMonthlyFee: 6.0,
    greenEnergyPercentage: 30,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 3.7,
    features: ["Laagste prijs", "Geen gedoe"],
  },
  {
    id: "tibber",
    name: "Tibber",
    logo: "/logos/tibber.svg",
    pricePerKwh: 0.37,
    pricePerM3Gas: 0.0, // Geen gas, alleen stroom
    fixedMonthlyFee: 5.0,
    greenEnergyPercentage: 100,
    contractDurationMonths: 1, // Maandelijks opzegbaar
    cancellationPeriodDays: 0,
    rating: 4.6,
    features: ["Slimme meter", "Uurprijzen", "App inzicht"],
  },
];

export function calculateTotalAnnualCost(
  provider: EnergyProvider,
  gasUsageM3: number,
  electricityUsageKwh: number
): number {
  const gasCost = gasUsageM3 * provider.pricePerM3Gas;
  const electricityCost = electricityUsageKwh * provider.pricePerKwh;
  const fixedCosts = provider.fixedMonthlyFee * 12;

  return gasCost + electricityCost + fixedCosts;
}

export function getProvidersSortedByCost(
  gasUsageM3: number,
  electricityUsageKwh: number
): Array<EnergyProvider & { totalAnnualCost: number }> {
  return providers
    .map((provider) => ({
      ...provider,
      totalAnnualCost: calculateTotalAnnualCost(
        provider,
        gasUsageM3,
        electricityUsageKwh
      ),
    }))
    .sort((a, b) => a.totalAnnualCost - b.totalAnnualCost);
}
