/**
 * review.interface.ts
 * Форма одного автора. Пов'язані файли: reviews.service.ts,
 * ../books/books.service.ts (використовує Author, щоб показати ім'я автора книжки).
 */
export interface Author {
  id: number;
  name: string;
  country: string;
}
