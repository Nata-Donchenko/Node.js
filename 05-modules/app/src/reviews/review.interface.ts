/**
 * review.interface.ts
 * Форма однієї рецензії. Пов'язані файли: reviews.service.ts,
 * reviews.controller.ts (обидва працюють з об'єктами Review).
 */

export interface Review {
  id: number;
  bookId: number;
  text: string;
  rating: number;
}