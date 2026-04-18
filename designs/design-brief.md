# EnergieVergelijker - Design Brief

## Project Overview

**Naam:** EnergieVergelijker  
**Doel:** Nederlandse energie vergelijker met calculator voor gas en stroom verbruik  
**Taal:** Nederlands  
**Locatie:** `/home/piet/.openclaw/workspace/_shared/projects/energie-vergelijker/`

---

## Kleurenpalet

### Primaire Kleuren
```
- Primary Green:    #10B981 (emerald-500)
- Primary Dark:     #059669 (emerald-600)
- Primary Light:    #34D399 (emerald-400)
```

### Secundaire Kleuren
```
- Accent Blue:      #3B82F6 (blue-500)
- Accent Purple:    #8B5CF6 (purple-500)
- Warning Orange:   #F59E0B (amber-500)
- Error Red:        #EF4444 (red-500)
```

### Neutrale Kleuren
```
- Background:       #F9FAFB (gray-50)
- Surface:          #FFFFFF (white)
- Text Primary:     #111827 (gray-900)
- Text Secondary:   #6B7280 (gray-500)
- Border:           #E5E7EB (gray-200)
```

### Gradients
```css
/* Hero gradient */
background: linear-gradient(135deg, #10B981 0%, #3B82F6 100%)

/* Card hover gradient */
background: linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)

/* CTA button gradient */
background: linear-gradient(90deg, #10B981 0%, #059669 100%)
```

---

## Component Structuur

### 1. Header
```
├── Logo (links)
├── Navigatie (optioneel)
└── Contact knop (rechts)
```

### 2. Hero Section
```
├── Titel: "Vergelijk energieaanbieders"
├── Subtitel: "Bespaar op uw gas en stroom"
└── CTA: "Start vergelijking"
```

### 3. Calculator Formulier
```
├── Postal Code Input
│   ├── Label: "Postcode"
│   ├── Placeholder: "1234 AB"
│   ├── Validatie: /^\d{4}\s?[A-Z]{2}$/i
│   └── Foutmelding: "Ongeldige postcode"
│
├── Gas Usage Input
│   ├── Label: "Jaarlijks gasverbruik (m³)"
│   ├── Type: number
│   ├── Min: 0
│   ├── Max: 10000
│   └── Placeholder: "Bijv. 1500"
│
├── Electricity Usage Input
│   ├── Label: "Jaarlijks stroomverbruik (kWh)"
│   ├── Type: number
│   ├── Min: 0
│   ├── Max: 50000
│   └── Placeholder: "Bijv. 2800"
│
└── Submit Button
    ├── Tekst: "Vergelijk aanbieders"
    └── State: disabled tot validatie slaagt
```

### 4. Results Section
```
├── Results Header
│   ├── Aantal aanbieders: "6 aanbieders gevonden"
│   └── Sorteer optie: "Gesorteerd op prijs"
│
└── Provider Cards (herhalend)
    ├── Provider Logo/Naam
    ├── Prijs Details
    │   ├── Prijs per kWh: €0,XX
    │   ├── Prijs per m³ gas: €X,XX
    │   └── Vaste maandkosten: €X,XX
    ├── Groene Energie: XX%
    ├── Totale Jaarkosten: €X.XXX,XX
    ├── Contract Details
    │   ├── Contractduur: 1/3/5 jaar
    │   └── Opzegtermijn: 30 dagen
    └── CTA: "Kies deze aanbieder"
```

### 5. Footer
```
├── Links (Privacy, Voorwaarden, Contact)
└── Copyright
```

---

## User Flow

```
┌─────────────────┐
│   Landing Page  │
│   (Hero + CTA)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Calculator    │
│   - Postcode    │
│   - Gas (m³)    │
│   - Stroom (kWh)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Validatie    │
│  (real-time)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Berekening    │
│  (total costs)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Resultaten     │
│  (gesorteerd)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Provider Card  │
│  - Details      │
│  - Kosten       │
│  - CTA          │
└─────────────────┘
```

### Interactie Details

1. **Postcode Validatie**
   - Real-time validatie tijdens typen
   - Groene border + checkmark bij geldig
   - Rode border + foutmelding bij ongeldig
   - Auto-format: "1234AB" → "1234 AB"

2. **Input Validatie**
   - Alleen positieve getallen
   - Max waarden met warning tooltip
   - Live preview van geschatte kosten

3. **Results Loading**
   - Skeleton loaders voor cards
   - Fade-in animatie per card (staggered)
   - Progress indicator tijdens berekening

4. **Sorteren**
   - Standaard: laagste totale kosten
   - Opties: groenste energie, laagste vaste kosten

---

## Mock Data Structuur

### Provider Object
```typescript
interface EnergyProvider {
  id: string;
  name: string;
  logo: string;
  pricePerKwh: number;      // € per kWh
  pricePerM3Gas: number;    // € per m³ gas
  fixedMonthlyFee: number;  // € per maand
  greenEnergyPercentage: number; // 0-100
  contractDurationMonths: number; // 12, 36, 60
  cancellationPeriodDays: number; // 30
  rating: number;           // 1-5 sterren
  features: string[];       // Bijv. ["100% groen", "Geen opzegkosten"]
}
```

### Mock Data (6 aanbieders)
```typescript
const providers: EnergyProvider[] = [
  {
    id: "vattenfall",
    name: "Vattenfall",
    logo: "/logos/vattenfall.svg",
    pricePerKwh: 0.38,
    pricePerM3Gas: 1.25,
    fixedMonthlyFee: 12.50,
    greenEnergyPercentage: 85,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 4.2,
    features: ["Groot aanbod", "Online klantenservice"]
  },
  {
    id: "essent",
    name: "Essent",
    logo: "/logos/essent.svg",
    pricePerKwh: 0.36,
    pricePerM3Gas: 1.20,
    fixedMonthlyFee: 15.00,
    greenEnergyPercentage: 60,
    contractDurationMonths: 36,
    cancellationPeriodDays: 30,
    rating: 3.9,
    features: ["Lange contractkorting", "24/7 support"]
  },
  {
    id: "eneco",
    name: "Eneco",
    logo: "/logos/eneco.svg",
    pricePerKwh: 0.40,
    pricePerM3Gas: 1.30,
    fixedMonthlyFee: 10.00,
    greenEnergyPercentage: 100,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 4.5,
    features: ["100% groene energie", "Lokaal opgewekt"]
  },
  {
    id: "greenchoice",
    name: "Greenchoice",
    logo: "/logos/greenchoice.svg",
    pricePerKwh: 0.35,
    pricePerM3Gas: 1.15,
    fixedMonthlyFee: 8.50,
    greenEnergyPercentage: 100,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 4.3,
    features: ["Goedkoopste groene", "Zonne-energie"]
  },
  {
    id: "budgetthuis",
    name: "Budgetthuis",
    logo: "/logos/budgetthuis.svg",
    pricePerKwh: 0.33,
    pricePerM3Gas: 1.10,
    fixedMonthlyFee: 6.00,
    greenEnergyPercentage: 30,
    contractDurationMonths: 12,
    cancellationPeriodDays: 30,
    rating: 3.7,
    features: ["Laagste prijs", "Geen gedoe"]
  },
  {
    id: "tibber",
    name: "Tibber",
    logo: "/logos/tibber.svg",
    pricePerKwh: 0.37,
    pricePerM3Gas: 0.00,  // Geen gas, alleen stroom
    fixedMonthlyFee: 5.00,
    greenEnergyPercentage: 100,
    contractDurationMonths: 1,  // Maandelijks opzegbaar
    cancellationPeriodDays: 0,
    rating: 4.6,
    features: ["Slimme meter", "Uurprijzen", "App inzicht"]
  }
];
```

### Berekening Formule
```typescript
function calculateTotalAnnualCost(
  provider: EnergyProvider,
  gasUsageM3: number,
  electricityUsageKwh: number
): number {
  const gasCost = gasUsageM3 * provider.pricePerM3Gas;
  const electricityCost = electricityUsageKwh * provider.pricePerKwh;
  const fixedCosts = provider.fixedMonthlyFee * 12;
  
  return gasCost + electricityCost + fixedCosts;
}
```

---

## Animaties (Framer Motion)

### Fade In (Cards)
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

// Staggered per card
transition={{ staggerChildren: 0.1 }}
```

### Hover Effects
```typescript
const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
};
```

### Button Press
```typescript
const buttonPress = {
  scale: 0.98,
  transition: { duration: 0.1 }
};
```

### Loading Skeleton
```typescript
const pulse = {
  opacity: [1, 0.5, 1],
  transition: { duration: 1.5, repeat: Infinity }
};
```

---

## Responsive Breakpoints

```css
/* Mobile First */
- Default: < 640px (sm)
- Tablet: 640px - 1024px (md/lg)
- Desktop: > 1024px (xl)

/* Layout aanpassingen */
- Mobile: Single column, stacked cards
- Tablet: 2 cards per row
- Desktop: 3 cards per row
```

---

## Technische Specificaties

### Stack
- **Framework:** React 18+
- **Styling:** Tailwind CSS 3.x
- **Animaties:** Framer Motion 10+
- **Validatie:** React Hook Form + Zod
- **State:** Zustand of Context API

### Bestandsstructuur
```
energie-vergelijker/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Calculator/
│   │   │   ├── CalculatorForm.tsx
│   │   │   ├── PostalCodeInput.tsx
│   │   │   └── UsageInput.tsx
│   │   ├── Results/
│   │   │   ├── ResultsList.tsx
│   │   │   ├── ProviderCard.tsx
│   │   │   └── SortControls.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── usePostalCodeValidation.ts
│   │   └── useEnergyCalculation.ts
│   ├── data/
│   │   └── providers.ts
│   ├── utils/
│   │   └── calculations.ts
│   └── App.tsx
├── designs/
│   └── design-brief.md
└── public/
    └── logos/
```

### Validatie Regex
```typescript
// Nederlandse postcode
const POSTCODE_REGEX = /^\d{4}\s?[A-Z]{2}$/i;

// Format helper
function formatPostalCode(value: string): string {
  const cleaned = value.replace(/\s/g, '').toUpperCase();
  if (cleaned.match(/^\d{4}[A-Z]{2}$/)) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  return value;
}
```

---

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigatie ondersteund
- ARIA labels op alle inputs
- Contrast ratio > 4.5:1
- Focus states duidelijk zichtbaar
- Screen reader friendly

---

## Performance Doelen

- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Bundle size < 200KB (gzipped)

---

## Next Steps

1. ✅ Design brief voltooid
2. ⏳ Component implementatie
3. ⏳ Calculator logica
4. ⏳ Provider data integratie
5. ⏳ Animaties toevoegen
6. ⏳ Testing (unit + e2e)
7. ⏳ Deploy

---

**Design voltooid:** 2026-04-18  
**Ontworpen door:** Mila (design agent)  
**Status:** Ready voor implementatie
