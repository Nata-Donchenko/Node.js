interface Result<T> {
  success: boolean;
  data: T;
  timestamp: Date;
}

const a: Result<string> = {
  success: true,
  data: 'abc',
  timestamp: new Date()
}
const b: Result<number[]> = {
  success: true,
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  timestamp: new Date()
}

a.data
b.data

interface ApiResponse<T> {
  status : 'success' | 'error';
  data: T;
}

interface User {
  id: number;
  email: string;
}

interface Post {
  id: number;
  title: string;
}

const apiUser: ApiResponse<User> = {
  status: 'success',
  data: {
    id: 1,
    email: '123@gmail.com'
  }
}

apiUser.data.email

const apiPosts: ApiResponse<Post[]> = {
  status: 'success',
  data: [
    {id: 1, title: 'abc'},
    {id: 2, title: 'cba'},
  ]
}

apiPosts.data

class Queue<T> {
  private items: T[] = []

  enqueue(item: T): void {
    this.items.push(item)
  }

  dequeue(): T | undefined {
    return this.items.shift()
  }

  size(): number {
    return this.items.length
  }
}

const q = new Queue<string>();
q.enqueue("a");
q.enqueue("b");
q.dequeue();   // "a"
q.size();      // 1

// q.enqueue(42);   // має бути помилка

async function fetchUser(): Promise<User> {
  return {id: 1, email: '123@test.com'};
}

async function fetchPosts(): Promise<Post[]> {
  return [
    {id: 1, title: 'abc'},
    {id: 2, title: 'cba'},
  ]
}

async function withLogging<T>(name: string, fn: () => Promise<T>): Promise<T> {
  console.log(`Початок: ${name}`)
  const result = await fn()
  console.log(`Готово: ${name}`)
  return result
}

async function main() {
  const user = await withLogging("fetchUser", () => fetchUser());
  const posts = await withLogging("fetchPosts", () => fetchPosts());
}

main();

// А
function logValue(value: unknown): void {
  console.log(value);
}

// Б
function parseJson(json: string): unknown {
  return JSON.parse(json);
}

const parsedUser = parseJson('{"id": 1}');