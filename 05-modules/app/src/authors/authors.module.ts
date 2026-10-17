/**
 * reviews.module.ts
 *
 * ReviewsModule - "коробка" з усім, що стосується авторів. Головне
 * тут - секція exports: вона каже Nest "ReviewsService можна
 * використовувати і за межами цього модуля, якщо хтось його
 * імпортує". Без цього рядка BooksModule НЕ зможе отримати
 * ReviewsService, навіть якщо імпортує ReviewsModule - побачите цю
 * помилку в вправах. Пов'язаний файл: ../books/books.module.ts
 * (імпортує цей модуль саме заради ReviewsService).
 */

import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  // exports: робить ReviewsService видимим для модулів, які
  // імпортують ReviewsModule (тут - BooksModule).
  exports: [AuthorsService],
})
export class AuthorsModule {}
