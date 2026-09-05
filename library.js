"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["Available"] = "available";
    ItemStatus["Borrowed"] = "borrowed";
    ItemStatus["Lost"] = "lost";
})(ItemStatus || (ItemStatus = {}));
const item1 = {
    id: 1,
    title: 'PublicItem',
    year: 2026,
    status: ItemStatus.Available,
};
const item2 = {
    id: 2,
    title: 'ItemPreview',
};
const item3 = {
    title: 'ItemUpdate',
    year: 2026,
    status: ItemStatus.Lost,
};
class LibraryItem {
    #status = ItemStatus.Available;
    title;
    year;
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }
    get status() {
        return this.#status;
    }
    borrow() {
        if (this.#status === ItemStatus.Borrowed) {
            console.log('Borrowed');
            return;
        }
        else {
            this.#status = ItemStatus.Borrowed;
            return;
        }
    }
}
class Book extends LibraryItem {
    author;
    constructor(title, year, author) {
        super(title, year);
        this.author = author;
    }
    describe() {
        return `Книга: ${this.title} (${this.year}), автор ${this.author}`;
    }
}
class Magazine extends LibraryItem {
    issueNumber;
    constructor(title, year, issueNumber) {
        super(title, year);
        this.issueNumber = issueNumber;
    }
    describe() {
        return `Журнал: ${this.title}, випуск №${this.issueNumber}`;
    }
}
class Book2 extends LibraryItem {
    author;
    constructor(title, year, author) {
        super(title, year);
        this.author = author;
    }
    describe() {
        return `Книга: ${this.title} (${this.year}), автор ${this.author}`;
    }
    matches(query) {
        const lowerQuery = query.toLowerCase();
        return this.title.toLowerCase().includes(lowerQuery) || this.author.toLowerCase().includes(lowerQuery);
    }
}
const items = [
    new Book("1984", 1949, "George Orwell"),
    new Book("The Hobbit", 1937, "J.R.R. Tolkien"),
    new Magazine("National Geographic", 2024, 305),
];
for (const item of items) {
    console.log(item.describe());
}
