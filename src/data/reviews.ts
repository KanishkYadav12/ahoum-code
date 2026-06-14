import { Review } from "@/types";

export const reviews: Record<string, Review[]> = {
  p2: [
    {
      id: "r1",
      userId: "u1",
      userName: "Aftar Hossen",
      rating: 5,
      comment: "Very fresh and crispy. Loved it!",
      createdAt: "2024-03-10",
    },
    {
      id: "r2",
      userId: "u2",
      userName: "Sarah K",
      rating: 4,
      comment: "Good quality, arrived fresh.",
      createdAt: "2024-03-08",
    },
  ],
};

export const getReviewsForProduct = (productId: string): Promise<Review[]> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(reviews[productId] ?? []), 500)
  );