enum ItemStatus {
  Available = "available",
  Borrowed = "borrowed",
  Lost = "lost",
}

interface LibraryItemData {
  id: number;
  title: string;
  year: number;
  status: ItemStatus;
  internalNote: string;
}

type PublicItem = Omit<LibraryItemData, 'internalNote'>
type ItemPreview = Pick<LibraryItemData, 'id' | 'title'>
type ItemUpdate = Partial<Omit<LibraryItemData, 'id'>>

const item1: PublicItem = {
  id: 1,
  title: 'PublicItem',
  year: 2026,
  status: ItemStatus.Available,
}

const item2: ItemPreview = {
  id: 2,
  title: 'ItemPreview',
}

const item3: ItemUpdate = {
  title: 'ItemUpdate',
  year: 2026,
  status: ItemStatus.Lost,
}

abstract class LibraryItem {
  #status = ItemStatus.Available;

  protected title: string;
  protected year: number;

  constructor(title: string, year: number) {
    this.title = title;
    this.year = year;
  }

  get status() {
    return this.#status;
  }

  borrow() {
    if (this.#status === ItemStatus.Borrowed) {
      console.log('Borrowed')
      return
    } else {
      this.#status = ItemStatus.Borrowed;
      return
    }
  }

  abstract describe(): string
}

class Book extends LibraryItem {
  author: string;

  constructor(title: string, year: number, author: string) {
    super(title, year);
    this.author = author;
  }

  describe(): string {
    return `Книга: ${this.title} (${this.year}), автор ${this.author}`;
  }
}

class Magazine extends LibraryItem {
  issueNumber: number;

  constructor(title: string, year: number, issueNumber: number) {
    super(title, year);
    this.issueNumber = issueNumber;
  }

  describe(): string {
    return `Журнал: ${this.title}, випуск №${this.issueNumber}`;
  }
}

// const item = new LibraryItem("Test", 2020); Cannot create an instance of an abstract class.

interface Searchable {
  matches(query: string): boolean;
}

class Book2 extends LibraryItem implements Searchable {
  author: string;

  constructor(title: string, year: number, author: string) {
    super(title, year);
    this.author = author;
  }

  describe(): string {
    return `Книга: ${this.title} (${this.year}), автор ${this.author}`;
  }

  matches(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return this.title.toLowerCase().includes(lowerQuery) || this.author.toLowerCase().includes(lowerQuery);
  }
}

const items: LibraryItem[] = [
  new Book("1984", 1949, "George Orwell"),
  new Book("The Hobbit", 1937, "J.R.R. Tolkien"),
  new Magazine("National Geographic", 2024, 305),
];

for (const item of items) {
  console.log(item.describe());
}