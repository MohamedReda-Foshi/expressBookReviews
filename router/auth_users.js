import books from './booksdb.js';
import jwt from 'jsonwebtoken';
import Router from 'express';


const public_users=Router();

const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

const isValidate = (username)=>{
    return username.some(user=>user.username===username);
};
//Task 7:
// /customer/login
// Assuming you have a User model
    
public_users.post('/login', async (req, res) => {
    
try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Please enter username and password" });
    }

    // Find the user in the in-memory array
    const user = users.find(user => user.username === username);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || 'your-secret-key', // Use environment variable or a fallback
      { expiresIn: '1h' } // Token expiration time
    );

    // Send success response with token
    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});
//Task 8:
// Add a book review

public_users.put('/auth/review/:isbn', (req, res)=>{
    try {
        const { isbn } = req.params;
        const { review } = req.body;
        const user = req.session.username;
        const book = books.find(book => book.isbn === isbn);
        if (!book) {
            return res.status(400).json({ message: "Book not found" });
        }
        book.reviews.push({ user, review });
        res.status(200).json({ message: "Review added successfully" });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

//Task 9:
// Add a book review

public_users.delete('/auth/review/:isbn', (req, res)=>{
    try {
        const { isbn } = req.params;
        const user = req.session.username;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
          }


        const book = book.find(book => book.isbn === isbn);
        if (!book) {
            return res.status(400).json({ message: "Book not found" });
        }
        if (!book.reviews || book.reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this book." });
          }
      
          const initialReviewCount = book.reviews.length;
          book.reviews = book.reviews.filter(review => review.user !== user);
      
         
          if (book.reviews.length === initialReviewCount) {
            return res.status(404).json({ message: "No reviews found for the logged-in user." });
          }
      
        
        return res.status(200).json({ message: "Review deleted successfully." });  
              
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});




export default public_users;


