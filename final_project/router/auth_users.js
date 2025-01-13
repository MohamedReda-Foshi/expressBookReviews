
const  Router  = require("express");
const jwt = require('jsonwebtoken'); 

const router=Router();

const isValidate = (username)=>{
    return username.some(user=>user.username===username);
};
//Task 7:
// /customer/login
router.post('/login', (req, res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message:"Please enter username and password"});
        }
        const token = jwt.sign(
            { username: user.username }, 
            process.env.JWT_SECRET || 'your-secret-key', 
          );
        res.status(200).json({ message: "Login successful.", token });
    }catch(err){
        res.status(400).send("err to get data"+{err})
    }

});
//Task 8:
// Add a book review

router.put('/auth/review/:isbn', (req, res)=>{
    try {
        const { isbn } = req.params;
        const user = req.session.username;
        const { review } = req.body;
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

export default router;
