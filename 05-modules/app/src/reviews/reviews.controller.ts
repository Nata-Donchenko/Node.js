/**
 * reviews.controller.ts
 * HTTP-шар рецензій - тонкий контролер, уся логіка в ReviewsService.
 * Пов'язаний файл: reviews.module.ts.
 */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.interface';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  
  @Get()
  findAll(@Query('bookId') bookId?: string): Review[] {
    // bookId приходить з адреси рядком (або undefined, якщо параметра немає):
    // рядок перетворюємо на число, а без параметра сервіс поверне всі рецензії.
    return this.reviewsService.findAll(
      bookId ? this.reviewsService.parseId(bookId) : undefined,
    );
  }
  
  @Post()
  create(@Body() dto: CreateReviewDto): Review {
    return this.reviewsService.create(dto);
  }
  
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.reviewsService.remove(this.reviewsService.parseId(id));
  }
}
