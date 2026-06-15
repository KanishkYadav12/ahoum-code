// ─── Enums ────────────────────────────────────────────────────────────

export enum ProductCategory {
  FreshFruits     = "fresh-fruits",
  Vegetables      = "vegetables",
  CookingOil      = "cooking-oil",
  MeatFish        = "meat-fish",
  BakerySnacks    = "bakery-snacks",
  DairyEggs       = "dairy-eggs",
  Beverages       = "beverages",
  Nutritions      = "nutritions",
}

export enum OrderStatus {
  Pending         = "pending",
  Confirmed       = "confirmed",
  Preparing       = "preparing",
  OutForDelivery  = "out_for_delivery",
  Delivered       = "delivered",
  Failed          = "failed",
  Cancelled       = "cancelled",
}

export enum SortOption {
  PriceLowHigh    = "price_asc",
  PriceHighLow    = "price_desc",
  Popularity      = "popularity",
  Newest          = "newest",
}

export enum AuthScreen {
  Splash          = "splash",
  Onboarding      = "onboarding",
  SignIn          = "signin",
  SignUp          = "signup",
  OTP             = "otp",
  Location        = "location",
}

export enum NavTab {
  Shop            = "shop",
  Explore         = "explore",
  Cart            = "cart",
  Favourite       = "favourite",
  Account         = "account",
}

// ─── Core Interfaces ───────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: ProductCategory;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isOrganic: boolean;
  isBestSeller: boolean;
  isFeatured?: boolean;
  isExclusiveOffer?: boolean;
  tags: string[];
  discount?: number;
  nutritionInfo?: NutritionInfo;
  brand?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  password?: string;
  avatar?: string;
  address?: Address;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  zone?: string;
  area?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: ProductCategory;
  image: string;
  bgColor: string;
  productCount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  address: Address;
  createdAt: string;
  estimatedDelivery: string;
  paymentMethod: string;
  promoCode?: string | null;
  discount?: number;
}

export interface FilterState {
  categories: ProductCategory[];
  brands: string[];
  priceRange: [number, number];
  onlyOrganic: boolean;
  onlyInStock: boolean;
  sortBy: SortOption;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ─── API Response shapes ───────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  perPage: number;
}

// ─── Additional Enums ──────────────────────────────────────────────────

export enum DeliveryMethod {
  STANDARD = "Standard Delivery",
  EXPRESS = "Express Delivery",
  PICKUP = "Store Pickup",
}

export enum PaymentMethod {
  CARD = "Credit/Debit Card",
  CASH = "Cash on Delivery",
  WALLET = "Digital Wallet",
}

// ─── Promo & Discount ──────────────────────────────────────────────────

export interface PromoCode {
  code: string;
  type: "percentage" | "flat";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  createdAt?: string;
  expiresAt?: string;
}

// ─── Toast System ─────────────────────────────────────────────────────

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

// ─── Auth ──────────────────────────────────────────────────────────────

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}