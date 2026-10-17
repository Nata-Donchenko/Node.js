/**
 * books.module.ts
 *
 * imports: [AuthorsModule] - дозволяє BooksService отримати
 * AuthorsService через конструктор (щоб показати ім'я автора книжки).
 *
 *forwardRef(() => ReviewsModule) - дозволяє BooksService
 * отримати ReviewsService для підрахунку середнього рейтингу.
 * Між BooksModule і ReviewsModule цикл: кожен імпортує інший.
 * Без forwardRef один із модулів під час завантаження файлів ще був би
 * undefined - Nest кинув би "UndefinedModuleException". forwardRef
 * відкладає звернення до класу, доки обидва файли не завантажаться.
 *
 * exports: [BooksService] - робить BooksService видимим для
 * ReviewsModule (перевірка існування книжки за bookId).
 *
 * Пов'язані файли: ../authors/authors.module.ts, ../reviews/reviews.module.ts,
 * books.service.ts (використовує AuthorsService і ReviewsService).
 */

import { forwardRef, Module } from '@nestjs/common';
import { AuthorsModule } from '../authors/authors.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [AuthorsModule, forwardRef(() => ReviewsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}