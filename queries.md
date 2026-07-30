1. Aggregation pipeline — це послідовність стадій обробки даних, де документи проходять через кожну стадію по черзі. 
Кожна стадія бере на вхід результат попередньої (або всю колекцію, якщо це перша стадія) і передає далі вже перетворений набір документів.
Стадії виконуються в тому порядку, в якому вони записані в масиві.

стадія $match фільтрує документи, 
стадія $group групує їх за певним полем і рахує агреговані значення (суму, середнє тощо), 
стадія $sort сортує результат,
стадія $project формує форму документів на виході стадії — дозволяє вибрати, які поля показувати, приховати непотрібні, перейменувати поля або створити нові обчислювані поля на основі існуючих.

{$group: {_id: '$category', count: {$sum: 1}}}
{_id: "food", count: 1}
{_id: "clothing", count: 2}
{_id: "electronics", count: 4}
{_id: "books", count 2}

{$group: {_id: '$category', avgPrice: {$avg: '$price'}}
{_id: "food", avgPrice: 25}
{_id: "books", avgPrice: 32.5}
{_id: "electronics", avgPrice: 1062.5}
{_id: "clothing", avgPrice: 120}

{$group: {_id: null, sumOfStock: {$sum: {$multiply: ['$price', '$stock']}}}}
{_id: null, sumOfStock: 27065}

{$group: {_id: '$category', avgPrice: {$avg: '$price'}}},
{$match: {avgPrice: {$gt: 300}}}
{_id: "electronics", avgPrice: 1062.5}

{$group: {_id: '$isActive', count: {$sum: 1}}}
{_id: true, count: 3}
{_id: false, count: 2}

2. COLLSCAN — це коли MongoDB перевіряє всі документи в колекції по черзі, щоб знайти потрібні. 
Якщо документів багато, це повільно.
IXSCAN — це коли MongoDB використовує індекс (окрему відсортовану структуру), 
щоб одразу знайти потрібні документи, не перевіряючи всі підряд. 
Це швидше за COLLSCAN, особливо коли документів багато.
   
db.products.getIndexes()
[ { v: 2, key: { _id: 1 }, name: '_id_' } ]

db.users.getIndexes()
[
  {v: 2, key: {_id: 1}, name: '_id_'},
  {v: 2, key: {email: 1}, name: 'email_1', unique: true}
]

Індекс email_1 в колекції users створився автоматично завдяки unique: true для поля email у файлі models/userModel.js. 
при першому підключенні моделі до бази автоматично створює індекс для полів, позначених як unique, 
щоб MongoDB могла ефективно перевіряти унікальність значення при вставці нових документів.

db.products.find({ category: 'electronics' }).explain("executionStats")
totalDocsExamined: 9,
totalKeysExamined: 0,
stage: 'COLLSCAN',

db.products.createIndex({ category: 1 })
db.products.find({ category: 'electronics' }).explain("executionStats")
totalDocsExamined: 4,
totalKeysExamined: 4,
stage: 'FETCH',
inputStage: {stage: 'IXSCAN'}

E11000 duplicate key error collection: shopDB.users index: email_1 dup key: { email: "olena@example.com" }
Помилка виникла тому що у ключа email_1 стоїть унікальний індекс unique: true.
Із-за цього MongoDB перевірив нового юзера перед вставкою та знайшов значення, яке вже зайняте і відхилив операцію

Після створення індексу на поле category кількість переглянутих документів (totalDocsExamined) зменшилась з 9 до 4 — 
тобто MongoDB тепер переглядає лише ті документи, які реально підходять під фільтр, а не всю колекцію. 
Це сталось тому, що замість повного сканування (COLLSCAN), де перевіряється кожен документ по черзі, 
MongoDB тепер використовує індекс, щоб одразу знайти потрібні документи (FETCH зі стадією IXSCAN всередині). 
Чим більша колекція, тим сильніше буде відчутна різниця в швидкості.


