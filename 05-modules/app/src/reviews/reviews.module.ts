/**
 * reviews.module.ts
 *
 * ReviewsModule - "коробка" з усім, що стосується рецензій.
 *
 * imports: [forwardRef(() => BooksModule)] - дозволяє ReviewsService
 * отримати BooksService через конструктор, щоб перед створенням
 * рецензії перевірити, що книжка з таким bookId існує.
 * Це працює лише тому, що BooksModule експортує BooksService.
 * forwardRef потрібен, бо BooksModule у відповідь імпортує ReviewsModule
 * (для середнього рейтингу) - модулі залежать один від одного, і без
 * forwardRef BooksModule на момент завантаження цього файлу був би undefined.
 *
 * exports: [ReviewsService] - робить ReviewsService видимим для
 * BooksModule (підрахунок середнього рейтингу книжки).
 *
 * Пов'язані файли: ../books/books.module.ts (другий бік циклу),
 * reviews.service.ts (використовує BooksService).
 */
import { forwardRef, Module } from '@nestjs/common';

import { BooksModule } from '../books/books.module';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})

export class ReviewsModule {}