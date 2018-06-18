const fs = require('fs');

function Library(name) {
    this.name = name;
    this.books = [];
    return this;
}

function Books(name, author, id, year) {
    this.name = name;
    this.author = author;
    this.id = id;
    this.year = year;
    this.borrow = false;
}

Library.prototype.getLibrary = function() {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'));
}

Library.prototype.updateLibrary = function() {
    return fs.writeFileSync('./data.json', JSON.stringify(this.books));
}

Library.prototype.getBooks = function() {
    this.books = this.getLibrary();
    return this.books;
}

Library.prototype.addBooks = function(book1) {
    this.books = this.getBooks();

    for(let i=0; i<this.books.length; i++) {
        if(this.books[i].id == book1.id) {
            console.log("this book already exist");
            break;
        } else {
            this.books.push(book1);
            this.updateLibrary();
            break;
        }
    }  
}

Library.prototype.getBookById = function(id) {
    this.books = this.getLibrary();
    // console.log(this.books.id);
    for(let i=0; i<this.books.length; i++) {
        if(this.books[i].id == id) {
            return this.books[i];
        }
    }
}

Library.prototype.getBookByIndex = function(id) {
    this.books = this.getLibrary();
    for(let i=0; i<this.books.length; i++) {
        if(this.books[i].id == id) {
            // console.log(i);
            return i;
        }
    }
}

Library.prototype.deleteBook = function(id) {
    // this.books = this.getLibrary();
    let bookIndex = this.getBookByIndex(id);
    if(bookIndex) {
        this.books.splice(bookIndex, 1);
        this.updateLibrary();
    }
}

Library.prototype.updateBook = function(id, newBook) {
    let bookIndex = this.getBookByIndex(id);
    this.books[bookIndex] = newBook;
    // console.log(newBook);
    this.updateLibrary();
}

Library.prototype.getBookByParam = function(param, value) {
    let book = this.getLibrary();
    let books = [];
    for(let i=0; i<book.length; i++) {
        if(book[i][param] == value) {
            books.push(book[i]);
        }
    }
    console.log(books);
}

const lib = new Library("Best");
const book1 = new Books("Strange man", "Morrisson", 12, 1998);
const book2 = new Books("Great wall", "Peterson", 20, 2009);
// lib.addBooks(book1);
//lib.getBookById(15);
//lib.getBookByIndex(15);
// lib.deleteBook(15);
// lib.updateBook(12, book2);
lib.getBookByParam("name","Sam-Smith");