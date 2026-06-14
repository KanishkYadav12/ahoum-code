import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { getReviewsForProduct } from "@/data/reviews";
import {
  Product,
  Category,
  ProductCategory,
  ApiResponse,
  PaginatedResponse,
  Review,
} from "@/types";

// ─── Helper ────────────────────────────────────────────────────────────

function delay<T>(data: T, ms = 700): Promise<ApiResponse<T>> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ data, success: true }),
      ms
    )
  );
}

function delayFail(ms = 700): Promise<ApiResponse<never>> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: null as never, success: false, message: "Network error" }),
      ms
    )
  );
}

// ─── Products ─────────────────────────────────────────────────────────

export const api = {
  products: {
    getAll: (): Promise<ApiResponse<Product[]>> =>
      delay(products, 800),

    getById: (id: string): Promise<ApiResponse<Product | null>> =>
      delay(products.find((p) => p.id === id) ?? null, 600),

    getByCategory: (
      category: ProductCategory
    ): Promise<ApiResponse<Product[]>> =>
      delay(
        products.filter((p) => p.category === category),
        700
      ),

    getBestsellers: (): Promise<ApiResponse<Product[]>> =>
      delay(
        products.filter((p) => p.isBestSeller),
        600
      ),

    getExclusive: (): Promise<ApiResponse<Product[]>> =>
      delay(
        products.filter((p) => p.discount !== undefined).slice(0, 6),
        600
      ),

    search: (query: string): Promise<ApiResponse<Product[]>> => {
      const q = query.toLowerCase().trim();
      return delay(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tags.some((t) => t.includes(q)) ||
            (p.brand?.toLowerCase().includes(q) ?? false)
        ),
        400
      );
    },
  },

  categories: {
    getAll: (): Promise<ApiResponse<Category[]>> =>
      delay(categories, 500),
  },

  reviews: {
    getByProductId: (productId: string): Promise<ApiResponse<Review[]>> =>
      getReviewsForProduct(productId).then((items) => ({
        data: items,
        success: true,
      })),
  },

  orders: {
    // Simulates 85% success rate
    place: (): Promise<ApiResponse<{ orderId: string }>> => {
      const success = Math.random() > 0.15;
      if (!success) return delayFail(2000) as Promise<ApiResponse<{ orderId: string }>>;
      return delay(
        { orderId: `ORD-${Date.now()}` },
        2000
      );
    },
  },

  auth: {
    sendOtp: (phone: string): Promise<ApiResponse<{ sent: boolean }>> => {
      console.log(`OTP sent to ${phone}`);
      return delay({ sent: true }, 1000);
    },

    verifyOtp: (
      _phone: string,
      code: string
    ): Promise<ApiResponse<{ verified: boolean }>> => {
      // Demo: any 4-digit code works, but "0000" always fails
      const verified = code.length === 4 && code !== "0000";
      if (!verified)
        return delay({ verified: false }, 1000);
      return delay({ verified: true }, 1000);
    },

    login: (
      email: string,
      password: string
    ): Promise<ApiResponse<{ token: string }>> => {
      if (!email || password.length < 6)
        return delay({ token: "" }, 1000);
      return delay({ token: `mock-token-${Date.now()}` }, 1200);
    },

    signup: (
      name: string,
      email: string,
      phone: string
    ): Promise<ApiResponse<{ userId: string }>> => {
      console.log("Signing up:", name, email, phone);
      return delay({ userId: `u-${Date.now()}` }, 1200);
    },
  },
};