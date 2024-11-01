async function addBook(event: Event) {
    event.preventDefault();
    const bookData = {
        title: (document.getElementById('title') as HTMLInputElement).value,
        author: (document.getElementById('author') as HTMLInputElement).value,
        numberOfPages: Number((document.getElementById('numberOfPages') as HTMLInputElement).value),
        status: (document.getElementById('status') as HTMLSelectElement).value,
        price: Number((document.getElementById('price') as HTMLInputElement).value),
        pagesRead: Number((document.getElementById('pagesRead') as HTMLInputElement).value),
        format: (document.getElementById('format') as HTMLSelectElement).value,
        suggestedBy: (document.getElementById('suggestedBy') as HTMLInputElement).value,
    };

    const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    });

    const newBook = await response.json();
    displayBooks([newBook]);
}

function displayBooks(books: any[]) {
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
    document.getElementById('bookForm')?.addEventListener('submit', addBook);
});