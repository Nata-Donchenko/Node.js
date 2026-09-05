function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

const n = getLast([1, 2, 3]);
const s = getLast(["a", "b"]);
const e = getLast([]);

function wrapInArray<T>(value: T): T[] {
  return [value]
}

const a = wrapInArray(5);
const b = wrapInArray("hello");

function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a]
}

const r = swap("Аліна", 26);

function filterAndTransform<T, U>(
  arr: T[],
  predicate: (item: T) => boolean,
  transform: (item: T) => U
): U[] {
  return arr.filter(predicate).map(transform);
}

const result = filterAndTransform(
  [1, 2, 3, 4],
  n => n % 2 === 0,
  n => `Число: ${n}`
);

function printId<T extends { id: number }>(obj: T): T {
  console.log(obj.id)
  return obj
}

const user = printId({ id: 1, email: "a@test.com" });
user.email;

// printId({ name: "Alice" });   // має бути помилка: немає id
// printId({ id: "abc" });       // має бути помилка: id не число

