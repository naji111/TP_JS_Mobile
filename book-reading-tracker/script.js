"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("./book");
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const stats = document.getElementById('stats');
let books = [];
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const pagesRead = parseInt(document.getElementById('pagesRead').value);
    const price = parseFloat(document.getElementById('price').value);
    const status = document.getElementById('status').value;
    const format = document.getElementById('format').value;
    const suggestedBy = document.getElementById('suggestedBy').value;
    const book = new book_1.Book(title, author, pages, pagesRead, price, status, format, suggestedBy);
    books.push(book);
    updateBookList();
    updateStats();
    bookForm.reset();
});
function updateBookList() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'border p-2 mb-2 bg-white';
        bookItem.innerHTML = `${book.title} by ${book.author} - ${book.readingPercentage.toFixed(2)}% read`;
        bookList.appendChild(bookItem);
    });
}
function updateStats() {
    const totalBooksRead = books.filter(book => book.finished).length;
    const totalPagesRead = books.reduce((acc, book) => acc + book.pagesRead, 0);
    stats.innerHTML = `Total Books Read: ${totalBooksRead}, Total Pages Read: ${totalPagesRead}`;
}
