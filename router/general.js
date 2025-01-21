import Router from "express";
import books from "./booksdb.js";
const public_users = Router();

// getting the list of books
//Task 1:
public_users.get("/", async (req, res) => {
  try {
    const LiskBook = Object.values(books);
    res.status(200).json(LiskBook);
  } catch (err) {
    res.status(400).send("err to get data" + { err });
  }
});
// Get book details based on ISBN
//Task 2:
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbnParam = req.params.isbn; // Accessing book by ISBN directly
    
    const book =Object.values(await books).filter(
      (book) =>book.isbn === isbnParam);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(400).send("Book not found with the provided ISBN");
    }
  } catch (err) {
    res.status(400).send("Error fetching book by ISBN: " + err.message);
  }
});
//Getting the book details based on the author under
//Task 3:
public_users.get("/author/:author", async (req, res) => {
  const author = req.params.author.toLowerCase();
  const matchingBooks = Object.values(await books).filter(
    (book) => book.author.toLowerCase() === author
  );

  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  }

  return res.status(404).json({ message: "No books by that author." });
});
//Get book by title
//Task 4:
public_users.get("/title/:title", async (req, res) => {
  const titleName = req.params.title;
  const booksDetails = Object.values(await books).filter(
    (book) => book.title === titleName
  );
  res.status(200).json(booksDetails);

  if (booksDetails.length > 0) {
    return res.status(200).json(booksDetails);
  }

  res.status(400).send("Book not found with the provided title");
});

//  Get book reviews by ISBN
//Task 5:
public_users.get("/review/:isbn", (req, res) => {
  try {
    const bookISBN = req.params.isbn;
    const bookProvided = books.find((book) => book.isbn === bookISBN);
    if (bookProvided) {
      res.status(200).json(bookProvided.reviews);
    } else {
      res.status(400).send("Book not found");
    }
  } catch (err) {
    res.status(400).send("err to get data" + { err });
  }
});
//public_users
//Task 6:
let users = [
  { id: 1, username: "John", password: "123456789" },
  { id: 2, username: "Jane", password: "123456789" },
  { id: 3, username: "reda", password: "123456789" },
];

public_users.post("/registering", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Create a new user object
    const newUser = {
      id: users.length + 1, // Generate a new ID
      username,
      password
    };

    // Add the new user to the users array
    users.push(newUser);

    // Return success response
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

export default public_users;
