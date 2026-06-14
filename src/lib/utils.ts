import { CartItem, FilterState, Product, SortOption } from "@/types";

// ─── Price ─────────────────────────────────────────────────────────────

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function calcDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

export function calcDeliveryFee(subtotal: number): number {
  return subtotal >= 100 ? 0 : 5.99;
}

export function calcCartTotals(items: CartItem[]): {
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
} {
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const deliveryFee = calcDeliveryFee(subtotal);
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    deliveryFee,
    total: parseFloat((subtotal + deliveryFee).toFixed(2)),
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
  };
}

// ─── Filtering & Sorting ───────────────────────────────────────────────

export function applyFilters(
  products: Product[],
  filters: FilterState
): Product[] {
  let result = [...products];

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.brands.length > 0) {
    result = result.filter(
      (p) => p.brand && filters.brands.includes(p.brand)
    );
  }

  result = result.filter(
    (p) =>
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  if (filters.onlyOrganic) {
    result = result.filter((p) => p.isOrganic);
  }

  if (filters.onlyInStock) {
    result = result.filter((p) => p.inStock);
  }

  switch (filters.sortBy) {
    case SortOption.PriceLowHigh:
      result.sort((a, b) => a.price - b.price);
      break;
    case SortOption.PriceHighLow:
      result.sort((a, b) => b.price - a.price);
      break;
    case SortOption.Popularity:
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case SortOption.Newest:
      result.sort((a, b) => a.id.localeCompare(b.id));
      break;
  }

  return result;
}

// ─── String ────────────────────────────────────────────────────────────

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

// ─── Date ──────────────────────────────────────────────────────────────

export function estimatedDelivery(minutesFromNow = 30): string {
  const d = new Date(Date.now() + minutesFromNow * 60000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Validation ────────────────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-]{8,15}$/.test(phone);
}

export function isValidOtp(otp: string): boolean {
  return /^\d{4}$/.test(otp);
}

// ─── Extract unique brands from products ───────────────────────────────

export function extractBrands(products: Product[]): string[] {
  const brands = products
    .map((p) => p.brand)
    .filter((b): b is string => b !== undefined);
  return [...new Set(brands)];
}