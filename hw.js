"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myBook = {
    id: 1,
    title: 'The Red and the Black',
    author: { name: 'Stendhal', country: 'France' },
    year: 1830,
    pages: 576,
    genre: 'Novel',
    rating: 4.5,
};
// myBook.id = 99;
const secondBook = {
    id: 2,
    title: '1984',
    author: { name: 'George Orwell', country: 'United Kingdom' },
    year: 1949,
    pages: 328,
};
const thirdBook = {
    id: 3,
    title: 'The Da Vinci Code',
    author: { name: 'Dan Brown', country: 'United States' },
    year: 2003,
    pages: 454,
    genre: 'Thriller',
};
const fourthBook = {
    id: 4,
    title: 'The Hunger Games',
    author: { name: 'Suzanne Collins', country: 'United States' },
    year: 2008,
    pages: 374,
    genre: 'Dystopian',
    rating: 4.3,
};
const library = [myBook, secondBook, thirdBook, fourthBook];
function getRecentBooks(books, afterYear) {
    const recentTitles = books.filter((book) => book.year > afterYear)
        .map((book) => book.title);
    return recentTitles;
}
console.log(getRecentBooks(library, 2000));
function printBook(book) {
    console.log(`"${book.title}" — ${book.author.name}`);
    if (book.genre) {
        console.log(book.genre);
    }
    if (book.rating) {
        console.log(book.rating);
    }
}
printBook(myBook);
printBook(secondBook);
console.log(secondBook.rating);
