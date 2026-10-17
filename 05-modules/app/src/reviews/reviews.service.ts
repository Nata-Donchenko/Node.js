/**
 * reviews.service.ts
 * Бізнес-логіка рецензій. Пов'язаний файл: reviews.module.ts (реєструє
 * і експортує цей сервіс), ../books/books.service.ts (використовує
 * findOneOrThrow з іншого модуля).
 */

import { BadRequestException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';

import { Review } from './review.interface';
import { CreateReviewDto } from './dto/create-review.dto';

import { BooksService } from '../books/books.service';


@Injectable()
export class ReviewsService {
  
  constructor(
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService
  ) {}
  
  private reviews: Review[] = [
    { id: 1, bookId: 1, text: 'Nice book', rating: 4 },
    { id: 2, bookId: 2, text: 'Interesting book', rating: 5 },
    { id: 3, bookId: 2, text: 'Good', rating: 4 },
  ]
  private nextId = 4
  
  parseId(id: string): number {
    const parsed = Number(id);
    if (Number.isNaN(parsed)) {
      throw new BadRequestException('id має бути числом');
    }
    return parsed;
  }
  
  findAll(bookId?: number): Review[] {
    if (!bookId) {
      return this.reviews
    }
    
    return this.reviews.filter(review => review.bookId === bookId)
  }
  
  create(dto: CreateReviewDto): Review {
    const { bookId, rating } = dto;
    
    this.booksService.findOneOrThrow(bookId);
    
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new BadRequestException('Оцінка має бути цілим числом в діапазоні 1-5');
    }
    
    const review: Review = {
      id: this.nextId,
      bookId,
      text: dto.text,
      rating,
    };
    
    this.nextId += 1;
    this.reviews.push(review);
    
    return review;
  }
  
  remove(id: number): void {
    const review = this.reviews.find(review => review.id === id);
    
    if (!review) {
      throw new NotFoundException(`Рецензію з id=${id} не знайдено`);
    }
    
    this.reviews = this.reviews.filter(review => review.id !== id);
  }
}
