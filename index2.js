const fs = require('fs');
const express = require('express');
const app = express();
let bodyParser = require('body-parser');

let lib1 = new Library("Best");
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('This is Nigeria, you gat it...yoyoyo111!');
})

app.get('/get-books', function(req, res) {
    res.send(lib1.getLibrary());
})

app.post('/add-book', function(req, res) {
    let param = req.body;
    let book3 = new Books(param.name, param.author, param.id, param.year, false);
    lib1.addBooks(book3);
    res.send(lib1.getBooks());
});

let port = 3000;
app.listen(port, function() {
    console.log(`The server is running on ${port}`);
})



function Library(name) {
    this.name = name;
    this.books = [];
    return this;
}

function Books(name, author, id, year, borrow) {
    this.name = name;
    this.author = author;
    this.id = id;
    this.year = year;
    this.borrow = borrow;
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

Library.prototype.borrowBook = function(id) {
    let bookIndex = this.getBookByIndex(id);
    let borrowBook = this.books[bookIndex];
    if(!borrowBook.borrow) {
        borrowBook.borrow = true;
        // console.log("You can borrow this book");
        
        this.updateLibrary();

    } else {
        console.log("You cannot borrow this book");
    }
    // for(let i=0; i<book.length; i++) {
    //     if(!book.borrow) {
    //         console.log("You can borrow this book");
    //     } else {
    //         console.log("You cannot borrow this book");
    //     }
    // }
}

// const lib = new Library("Best");
const book1 = new Books("Strange man", "Morrisson", 12, 1998, false);
const book2 = new Books("Great wall", "Peterson", 20, 2009, false);
// lib.addBooks(book1);
//lib.getBookById(15);
//lib.getBookByIndex(15);
// lib.deleteBook(15);
// lib.updateBook(12, book2);
// lib.getBookByParam("name","Sam-Smith");
// lib.borrowBook(150);