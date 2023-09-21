

function findAuthorById(authors = [], id = 0) {
  for (let authorObj of authors) {
    if (authorObj.id === id) {
      return authorObj;
    }
  }
}

function findBookById(books = [], id = "") {
  for (let bookObj of books) {
    if (bookObj.id === id) {
      return bookObj;
    }
  }
}

/*
It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.

The first array contains book objects that represent the books _that are currently checked out_, while the second array contains book objects that represent the books _that have been returned._ You can check for the return status by looking at the first transaction object in the `borrows` array.

**Example:**

[
    [
      {
        id: "5f447132d487bd81da01e25e",
        title: "sit eiusmod occaecat eu magna",
        genre: "Science",
        authorId: 8,
        borrows: [
          {
            id: "5f446f2e2cfa3e1d234679b9",
            returned: false,
          },
          ...
        ]
      },
      ...
    ],
    [
      {
        id: "5f44713265e5d8d17789beb0",
        title: "tempor occaecat fugiat",
        genre: "Travel",
        authorId: 16,
        borrows: [
          {
            id: "5f446f2e4eff1030e7316861",
            returned: true,
          },
          ...
        ]
      },
      ...
    ]
  ]

*/

//
function partitionBooksByBorrowedStatus(books = []) {
  let checkedOut = [];
  let returned = [];
  for (let bookObj of books) {
    const { borrows } = bookObj;
    const isReturned = borrows[0].returned;
    if (isReturned) {
      returned.push(bookObj);
    } else {
      checkedOut.push(bookObj);
    }
  }
  return [checkedOut, returned];
}

/*


**Example:**

[
    {
      id: "5f446f2e4eff1030e7316861",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/barber.waters@kegular.biz",
      age: 37,
      name: {
        first: "Barber",
        last: "Waters",
      },
      company: "KEGULAR",
      email: "barber.waters@kegular.biz",
      registered: "Tuesday, April 14, 2020 9:15 PM",
    },
    {
      id: "5f446f2ecc5c4787c403f844",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/dyer.trevino@slax.io",
      age: 34,
      name: {
        first: "Dyer",
        last: "Trevino",
      },
      company: "SLAX",
      email: "dyer.trevino@slax.io",
      registered: "Saturday, August 1, 2015 8:13 PM",
    },
  ]
*/

//return [{}, {}, etc...]
//add returned key and value from borrowers array in given bookObj to accountObj when account id === ids in borrows array in bookObj
/*{
  accountObj
  returned: true/false
}

It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's `borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.
*/

let {findAccountById} = require("./accounts");
//helper function

function getBorrowersForBook(book = {}, accounts = []) {
  const {borrows} = book;
  const result = borrows.map((borrowsObj) => {
    const {id, returned} = borrowsObj;
    const foundAccount = findAccountById(accounts, id);
    foundAccount.returned = returned;
    return foundAccount;
  })
  return result.slice(0, 10); //slice method, (start index, end index): end is not included
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
