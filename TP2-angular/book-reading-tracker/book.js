"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Format = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Read"] = "Read";
    Status["ReRead"] = "Re-read";
    Status["DNF"] = "DNF";
    Status["CurrentlyReading"] = "Currently reading";
    Status["ReturnedUnread"] = "Returned Unread";
    Status["WantToRead"] = "Want to read";
})(Status || (exports.Status = Status = {}));
var Format;
(function (Format) {
    Format["Print"] = "Print";
    Format["PDF"] = "PDF";
    Format["Ebook"] = "Ebook";
    Format["AudioBook"] = "AudioBook";
})(Format || (exports.Format = Format = {}));
class Book {
    constructor(title, author, numberOfPages, status, price, pagesRead = 0, format, suggestedBy, finished = false) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = finished;
        this.updateFinishedStatus();
    }
    currentlyAt() {
        return (this.pagesRead / this.numberOfPages) * 100;
    }
    deleteBook() {
        // Logic to delete the book from the database  
    }
    updateFinishedStatus() {
        this.finished = this.pagesRead >= this.numberOfPages;
    }
}
exports.Book = Book;
