export enum Status {
    Read = "Read",
    ReRead = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read",
}

export enum Format {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    AudioBook = "AudioBook",
}

export class Book {
    constructor(
        public title: string,
        public author: string,
        public numberOfPages: number,
        public status: Status,
        public price: number,
        public pagesRead: number = 0,
        public format: Format,
        public suggestedBy: string,
        public finished: boolean = false
    ) {
        this.updateFinishedStatus();
    }

    currentlyAt(): number {
        return (this.pagesRead / this.numberOfPages) * 100;
    }

    deleteBook(): void {
        // Logic to delete the book from the database  
    }

    private updateFinishedStatus(): void {
        this.finished = this.pagesRead >= this.numberOfPages;
    }
}