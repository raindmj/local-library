function findAccountById(accounts = [], id = "") {
  for (let accountObj of accounts) {
    if (accountObj.id === id) {
      return accountObj;
    }
  }
}

function sortAccountsByLastName(accounts = []) {
  accounts.sort((accountA, accountB) => {
    const lastA = accountA.name.last;
    const lastB = accountB.name.last;
    return lastA.toLowerCase() < lastB.toLowerCase() ? -1 : 1;
  });
  return accounts;
}

/*

**Example:**

getTotalNumberOfBorrows(account, books); // 22

It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.

*/
function getTotalNumberOfBorrows(account = {}, books = []) {
  const result = books.reduce((total, bookObj) => {
    const { borrows } = bookObj;
    const bookIdMatch = borrows.filter((borrowsObj) => {
      const { id } = borrowsObj;
      return id === account.id;
    });
    total += bookIdMatch.length;
    return total;
  }, 0);
  return result;
}

/*

**Example:**

[
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]

It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
*/

//returns new array of bookObj with authorObj added to bookObj //map(): returns new array with modified bookObj
//find out which books have been checked out by given account, only first element in borrows array matters

//find every bookObj that has been checked out (borrows[0].returned === false) and whose borrows id matches the given account id
//using that list, modify the bookObj so that authorObj is in it as well

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  const filteredBooks = books.filter((book) => {
    return book.borrows.some((borrow) => {
      return account.id === borrow.id && borrow.returned === false;
    })
  }) 

  const booksPossessed = filteredBooks.map((book) => {
    const foundAuthor = authors.find((author) => {
      return author.id === book.authorId;
    })
    book.author = foundAuthor;
    return book;
  })
  
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
