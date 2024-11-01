"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function addBook(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const bookData = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            numberOfPages: Number(document.getElementById('numberOfPages').value),
            status: document.getElementById('status').value,
            price: Number(document.getElementById('price').value),
            pagesRead: Number(document.getElementById('pagesRead').value),
            format: document.getElementById('format').value,
            suggestedBy: document.getElementById('suggestedBy').value,
        };
        const response = yield fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });
        const newBook = yield response.json();
        displayBooks([newBook]);
    });
}
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    if (bookList) {
        books.forEach(book => {
            const bookItem = document.createElement('div');
            const percentage = (book.pagesRead / book.numberOfPages) * 100;
            bookItem.innerHTML = `<p>${book.title} by ${book.author} - ${percentage.toFixed(2)}% read</p>`;
            bookList.appendChild(bookItem);
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    (_a = document.getElementById('bookForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', addBook);
});
