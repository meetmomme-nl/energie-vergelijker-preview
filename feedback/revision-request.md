# Revision Request - EnergieVergelijker Code Review

**Review Date:** 2026-04-18  
**Reviewer:** Lex (via Peter)  
**Status:** ❌ Changes Required Before Approval

---

## Summary

Build passes successfully and core logic is sound. However, several accessibility and configuration issues must be addressed before deployment.

---

## ✅ Approved Items

### 1. Postcode Validation
- Regex `/^\d{4}\s?[A-Z]{2}$/i` correctly validates Dutch format
- Auto-format in `Calculator.tsx` working properly
- Real-time validation with visual feedback implemented

### 2. Calculator Logic
- `calculateTotalAnnualCost()` in `lib/providers.ts` is correct:
  ```typescript
  gasCost + electricityCost + (fixedMonthlyFee * 12)
  ```
- Input validation with reasonable max values (10000 m³ gas, 50000 kWh)

### 3. Provider Comparison
- 6 providers defined in `lib/providers.ts`
- Sorting by `totalAnnualCost` working correctly
- All required fields present (pricing, contract terms, ratings)

### 4. Build
- `npm run build` passes with no warnings
- TypeScript compilation successful (`npx tsc --noEmit`)
- No console statements found in code

---

## ❌ Required Fixes

### 1. Missing Logo Assets [HIGH PRIORITY]
**Issue:** `public/logos/` directory is empty, but providers reference logo SVGs.

**Fix:** Add logo files for all 6 providers:
- `/logos/vattenfall.svg`
- `/logos/essent.svg`
- `/logos/eneco.svg`
- `/logos/greenchoice.svg`
- `/logos/budgetthuis.svg`
- `/logos/tibber.svg`

**Or:** Update `ProviderCard.tsx` to use the letter fallback consistently (currently shown in code but logo path is referenced).

---

### 2. Accessibility Issues [HIGH PRIORITY]

#### 2a. Form Input Accessibility
**File:** `components/Calculator.tsx`

**Add to each input:**
```tsx
// Postcode input
<input
  // ...existing props
  aria-invalid={!!errors.postcode}
  aria-describedby={errors.postcode ? "postcode-error" : undefined}
/>
{errors.postcode && (
  <p id="postcode-error" className="mt-1 text-sm text-red-600">
    {errors.postcode}
  </p>
)}
```

**Apply same pattern to:**
- `gasUsage` input (aria-describedby="gasUsage-error")
- `electricityUsage` input (aria-describedby="electricityUsage-error")

#### 2b. Button Accessibility
**File:** `components/Results.tsx`, `app/page.tsx`

**Add aria-labels:**
```tsx
<motion.button
  // ...existing props
  aria-label="Opnieuw zoeken"
>
```

#### 2c. Skip Link
**File:** `app/layout.tsx`

**Add skip navigation link:**
```tsx
<body className="antialiased">
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-gray-900 px-4 py-2 rounded">
    Skip to main content
  </a>
  <main id="main-content">{children}</main>
</body>
```

---

### 3. ESLint Configuration [MEDIUM PRIORITY]

**Issue:** `npm run lint` prompts for configuration instead of running.

**Fix:** Create `.eslintrc.json`:
```json
{
  "extends": "next/core-web-vitals"
}
```

Then verify with:
```bash
npm run lint
```

---

### 4. Image Alt Text [MEDIUM PRIORITY]

**File:** `components/ProviderCard.tsx`

**If logos are added, ensure alt text:**
```tsx
<img
  src={provider.logo}
  alt={`${provider.name} logo`}
  className="w-12 h-12 object-contain"
/>
```

---

### 5. Loading State Accessibility [LOW PRIORITY]

**File:** `components/Calculator.tsx`

**Add aria-busy and aria-live during loading:**
```tsx
<form 
  onSubmit={handleSubmit} 
  className="space-y-6"
  aria-busy={isLoading}
>
```

**File:** `app/page.tsx`

**Add live region for results:**
```tsx
<motion.section
  // ...existing props
  aria-live="polite"
  aria-busy={isLoading}
>
```

---

## Testing Checklist for Bram

After fixes, verify:

- [ ] All 6 provider logos display correctly (or fallback letters show)
- [ ] Screen reader announces form errors properly
- [ ] Tab navigation works through all form fields
- [ ] Focus states visible on all interactive elements
- [ ] Mobile layout responsive (test < 768px)
- [ ] ESLint runs without errors
- [ ] Build still passes: `npm run build`

---

## Notes for Bram

- Keep the letter fallback design in `ProviderCard.tsx` - it's elegant and avoids logo dependency issues
- The Dutch text is correct throughout
- Framer Motion animations are smooth and well-implemented
- TypeScript types are properly defined, no `any` types found

---

**Next Steps:**
1. Implement fixes above
2. Run `npm run build` to verify no regressions
3. Run `npm run lint` to verify ESLint passes
4. Mark this file as complete when ready for re-review
