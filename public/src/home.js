function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

//dataset: books
//parameters: books

//It returns a _number_ that represents the number of books _that are currently checked out of the library._ This number can be found by looking at the first transaction object in the `borrows` array of each book. If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.

/*
**Example:**

getBooksBorrowedCount(accounts); // 65

*/

function getBooksBorrowedCount(books = []) {
  let bookBorrowed = 0;
  for (let book of books) {
    //book {} is each obj in books
    const { borrows } = book; //borrows is array
    if (!borrows[0].returned) {
      bookBorrowed++;
    }
  }
  return bookBorrowed;
}

//dataset: books
//parameters: books

/*
Each object in the returned array has two keys:

- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.

Even if there is a tie, the array should only contain no more than five objects.

**Example:**

getMostCommonGenres(books);

  [
    { name: "Nonfiction", count: 9 },
    { name: "Historical Fiction", count: 7 },
    { name: "Thriller", count: 7 },
    ...
  ]

It returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.
*/

//loop through books
//find genre, store in variable
//find number of times the genre occurs, store in variable

/*
put in obj first so that we can count when genres repeat, utilizes the propety of obj where keys cannot be repeated
lookup = {
  "genre": 1
  "genre2": 1
  "genre3": 1
}
*/

function getMostCommonGenres(books = []) {
  let countObj = {}; //should look like lookup obj above
  for (let book of books) {
    const { genre } = book;
    if (!countObj[genre]) {
      countObj[genre] = 1;
    } else {
      countObj[genre]++;
    }
  }
  let countArray = [];
  for (let genreKey in countObj) {
    //genreKey = genre: count
    const newObj = { name: genreKey, count: countObj[genreKey] }; //countObj[genreKey]
    countArray.push(newObj);
  }
  //sort countArray
  countArray.sort((elementA, elementB) => {
    return elementB.count - elementA.count;
  });
  return countArray.slice(0, 5);
}

/*
Each object in the returned array has two keys:

- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.

Even if there is a tie, the array should only contain no more than five objects.

**Example:**

[
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]

It returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.
*/

//number of times book borrowed = borrows.length;
//
function getMostPopularBooks(books = []) {
  //declare new result array
  let result = [];
  //for each book in books array:
  for (let book of books) {
    //find title of book and borrows array
    const { title, borrows } = book;
    //declare newObj with {name: title, count: borrows.length}
    const newObj = { name: title, count: borrows.length };
    //push newObj into result array
    result.push(newObj);
  }
  //sort result in descending order
  result.sort((elementA, elementB) => {
    return elementB.count - elementA.count;
  });
  //limit result to top 5
  return result.slice(0, 5);
}

/*
Each object in the returned array has two keys:

- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.

Even if there is a tie, the array should contain no more than five objects.

**Example:**

 [
    { name: "Cristina Buchanan", count: 112 },
    { name: "Tami Hurst", count: 83 },
    { name: "Chrystal Lester", count: 80 },
    ...
  ]

It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.
*/

/*
newObj = {
  authorId: 20 (borrows.length)
  authorId2: 30
}

let result = [];
let count = 0;
for (let author of authors) {
  newObj = {name: `author.name.first author.name.last`, count: count}
  for (let book of books) {
    author.id === book.authorId ? newObj["count"] += book.borrows.length : 0
  }
  result.push(newObj);
}

*/

function getMostPopularAuthors(books = [], authors = []) {
  let result = [];
  let count = 0;
  for (let author of authors) {
    newObj = { name: `${author.name.first} ${author.name.last}`, count: count };
    for (let book of books) {
      if (author.id === book.authorId) {
        newObj["count"] += book.borrows.length;
      }
    }
    result.push(newObj);
  }
  result.sort((elementA, elementB) => elementB.count - elementA.count);
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
