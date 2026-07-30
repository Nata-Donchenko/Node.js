3. Обробка помилок

3.1. Невалідний ObjectId
Запит: `GET /api/products/123abc`
Відпвідь: `400 Bad Request`
json:
{ "message": "Invalid _id: 123abc" }


3.2. Невалідне значення enum (category)
Запит: `POST /api/products`
Тіло:
json:
{ "name": "Toy Car", "price": 15, "category": "toys", "stock": 5 }
Відповідь: `400 Bad Request`
json:
{
"message": "Validation failed",
"errors": ["`toys` is not a valid enum value for path `category`."]
}


3.3. Помилка валідації (список полів)
Запит: `POST /api/products`
Тіло: (будь-яке з невалідним/відсутнім обов'язковим полем, наприклад без `name`)
json:
{ "price": 15, "category": "electronics", "stock": 5 }
Відповідь: `400 Bad Request`
json:
{
"message": "Validation failed",
"errors": ["Path `name` is required."]
}

3.5 Неіснуючий маршрут
Запит: `GET /api/nonexistent`
Відповідь: `404 Not Found`
json:
{ "message": "Route /api/nonexistent not found" }


4. Кешування
`GET /api/products` кешує результат у пам'яті на 30 секунд. 
Якщо протягом цього часу хтось створить новий товар через `POST /api/products`, кеш про
це не дізнається — наступні GET-запити (до закінчення 30 секунд) поверне
старі дані без щойно доданого товару. Це проблема застарілих даних (stale cache).

Виправити можна, скинувши кеш одразу після успішного створення/оновлення/
видалення товару — наприклад, встановити `cache.timestamp = null` у
контролерах `addProduct`, `updateProduct`, `deleteProduct`, щоб наступний
GET-запит завжди брав свіжі дані з бази.


Пагінація

`GET /api/products` підтримує пагінацію через query-параметри `page` і `limit`.
Приклад: `GET /api/products?page=2&limit=5` — поверне другу сторінку по 5 товарів.
Якщо параметри не передані, за замовчуванням `page=1`, `limit=5`.
Відповідь містить не тільки масив товарів, а й:
`totalCount` — загальна кількість товарів у базі
`currentPage` — поточна сторінка
`totalPages` — загальна кількість сторінок

Приклад відповіді:
{
"products": [...],
"totalCount": 9,
"currentPage": 2,
"totalPages": 3
}

Кожна комбінація page+limit кешується окремо на 30 секунд.