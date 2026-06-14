# Project Audit & Implementation Plan - Nectar Grocery App

## 1. Audit Summary

### 1.1. Visual & UI Inconsistencies
- **Missing Professional Polish:** Multiple typos throughout the app ("Favorurite", "tembly", "Sing-in", "Pament", "onbording"). These must be corrected to match professional standards.
- **Hardcoded Mobile UI:** Most screens in `src/pages` have hardcoded iOS status bars (time, battery, signal) which should be removed for a clean web/PWA experience.
- **Iconography:** The "Carrot" icon in some screens deviates from the Figma source.
- **Color Consistency:** The brand green (#53B175) is used but some shadows and borders don't match Figma's elevation specs.

### 1.2. Functional & Flow Issues
- **Home Screen (CRITICAL):** `src/app/(main)/home/page.tsx` is essentially empty, containing only a BottomNav. All sections (Exclusive Offer, Best Selling, Groceries) are missing.
- **Log-in Flow:** The standard Email/Password login screen (`log-in.png`) is missing. `SignIn.tsx` only handles Social/Phone.
- **Checkout Flow:** The checkout process is currently a sheet but lacks full integration with a multi-step flow if required, or at least lacks the visual fidelity of the Figma checkout.
- **Search:** Search is implemented but lacks debouncing and proper skeleton loaders.
- **Navigation:** Bottom navigation labels use "Favourite" (with typo) and the routing between Pages and App Router causes unnecessary re-renders in some cases.

### 1.3. Architecture & State Management
- **Zustand Fragmentation:** Stores are split between `src/store/` and `src/stores/`. Specifically, `checkoutStore.ts` exists in both places.
- **Hybrid Architecture:** The project uses Next.js App Router for routing but UI logic lives in `src/pages`. While functional, it leads to duplication.
- **TypeScript:** Several `any` types and missing interfaces for API responses (mock data).

---

## 2. Detailed Screen Comparison

| Figma Screen | Implementation Status | Issues Found |
| :--- | :--- | :--- |
| `splash-screen.png` | Implemented | Hardcoded status bar; transition logic is basic. |
| `onbording.png` | Implemented | Typo in name; hardcoded status bar. |
| `Sing-in.png` | Implemented | Typo "Sing-in"; hardcoded status bar. |
| `log-in.png` | **MISSING** | No email/password login form exists. |
| `signup.png` | Implemented | Typo "Sing up" (should be Sign Up). |
| `Verification.png` | Implemented | Status bar issues; needs better keyboard handling. |
| `select-location.png` | Implemented | Dropdowns need styling polish. |
| `home-screen.png` | **INCOMPLETE** | Only BottomNav exists. All content is missing. |
| `product-detail.png` | Implemented | Desktop layout exists but needs refinement. |
| `Explore.png` | Implemented | Category grid is static; needs dynamic data. |
| `beverages.png` | Implemented | Filtering logic is partially implemented. |
| `filters.png` | Implemented | Styling of checkboxes needs to match Figma exactly. |
| `my-cart.png` | Implemented | "Check Out" button styling. |
| `Checkout.png` | Implemented (Sheet) | Lacks some details; "Pament" typo. |
| `Order-Accepted.png` | Implemented | Basic implementation. |
| `Error.png` | **MISSING** | No "Order Failed" modal implementation found in flow. |
| `Favorurite.png` | Implemented | Name contains typo "Favorurite". |
| `account.png` | Implemented | Layout needs refinement. |

---

## 3. Implementation Plan (Prioritized)

### Phase 1: Foundation & Cleanup (High Priority)
1.  **Zustand Consolidation:** Move all stores to `src/stores/` and remove `src/store/`. Merge duplicate `checkoutStore.ts`.
2.  **Global Naming Fix:** Search and replace "Favorurite" -> "Favorite", "onbording" -> "onboarding", "Sing-in" -> "Sign-in", etc.
3.  **UI Cleanup:** Remove hardcoded status bars from all `src/pages` files.
4.  **Route Standardization:** Ensure all routes in `src/app` correctly wrap their corresponding `src/pages` components without layout shifts.

### Phase 2: Missing Core Features (High Priority)
1.  **Home Screen Reconstruction:** Implement `Home` page with:
    - Location header.
    - Search bar (debounced).
    - Banner slider (Exclusive Offer).
    - Horizontal scroll sections for "Exclusive Offer" and "Best Selling".
    - "Groceries" category section.
2.  **Email Login:** Create the missing Login screen with email/password validation.

### Phase 3: Visual Polish & UX (Medium Priority)
1.  **Skeleton Loaders:** Add skeletons for Home, Explore, and Product details.
2.  **Empty States:** Add "Empty Cart" and "No Favorites" screens.
3.  **Search Optimization:** Implement debounced search in the `Explore` and `Home` screens.
4.  **Error Handling:** Implement the "Order Failed" modal logic.

### Phase 4: Refinement & Verification (Low Priority)
1.  **Desktop Responsiveness:** Audit all screens on 1440px+ and ensure containers are centered and readable.
2.  **TypeScript Strictness:** Remove `any` types and define proper interfaces for Products, Categories, and User state.
3.  **Final Quality Audit:** Verify every screen against Figma one last time.

---

## 4. Requirement Compliance Checklist
- [ ] 100% Figma Match (Colors, Spacing, Typography)
- [ ] Correct Routing (Next.js App Router)
- [ ] Consolidated Zustand State
- [ ] Responsive Design (Mobile & Desktop)
- [ ] No Professional Typos
- [ ] Functional Checkout & Search
