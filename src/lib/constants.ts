export const APP_NAME = "nectar";
export const APP_TAGLINE = "online groceries";

export const DELIVERY_FREE_THRESHOLD = 100;
export const DELIVERY_FEE = 5.99;
export const DEMO_OTP = "1234";
export const OTP_LENGTH = 4;

export const PRICE_RANGE_MIN = 0;
export const PRICE_RANGE_MAX = 100;

export const SEARCH_DEBOUNCE_MS = 350;
export const MAX_RECENT_SEARCHES = 8;

export const SKELETON_COUNT = 6;

export const NAV_ITEMS = [
  { tab: "shop",      label: "Shop",      href: "/home"      },
  { tab: "explore",   label: "Explore",   href: "/explore"   },
  { tab: "cart",      label: "Cart",      href: "/cart"      },
  { tab: "favourite", label: "Favourite", href: "/favourites" },
  { tab: "account",   label: "Account",   href: "/account"   },
] as const;

export const BRANDS = [
  "Individual Collection",
  "Cocola",
  "Naturel",
  "Kazi Farmas",
  "Rad",
] as const;

export const PROMO_CODES = [
  { code: "NECTAR10", type: "percentage", value: 10, minOrderValue: 5, maxDiscount: 20 },
  { code: "SAVE5", type: "flat", value: 5, minOrderValue: 10 },
  { code: "FREESHIP", type: "flat", value: 3, minOrderValue: 0 },
] as const;