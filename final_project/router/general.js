const  Router  = require("express")
const router=Router();

// getting the list of books
//Task 1:
router.get('/', async(req, res)=> {
    try{
        const LiskBook=LiskBook.find();
        res.status(200).json(LiskBook);
    }
    catch(err){

        res.status(400).send("err to get data"+{err})
    }
});
// Get book details based on ISBN
//Task 2:
router.get('/isbn/:isbn', async(req, res) =>{
    try{  
        const targetISBN=targetISBN.find({isbn:req.params.isbn});
        res.status(200).json(targetISBN);
    }
    catch(err){
        res.status(400).send("err to get data"+{err})
    }
});
//public_users
//Task 3:
router.get('/author/:author', async(req, res) =>{
    try{
        const authorName = req.params.author;
        const booksByAuthor = books.filter(book => book.author === authorName);
        res.status(200).json(booksByAuthor);    
    }catch(err){
        res.status(400).send("err to get data"+{err})
    }
});
//Get book by title
//Task 4:
router.get('/title/:title', async (req, res)=>{
    try{
        const titleName = req.params.title;
        const booksDetails = books.filter(book => book.title === titleName);
        res.status(200).json(booksDetails);
    }catch(err){
        res.status(400).send("err to get data"+{err})
    }
});

//  Get book reviews by ISBN
//Task 5:
router.get('/review/:isbn', (req, res)=>{
    try{
        const bookISBN = req.params.isbn;
        const bookProvided=books.find(book => book.isbn === bookISBN);
        if(bookProvided){
            res.status(200).json(bookProvided.reviews);
        }else{
            res.status(400).send("Book not found");
        }
    }catch(err){
        res.status(400).send("err to get data"+{err})
    }
});
//public_users
//Task 6:
router.post("/registering ", (req, res)=>{
    try{
        const {username,password} = req.body;
        if(!username){
            return res.status(400).json({ message: "Username are required." });
        }
           const existingUser =User.findOne({ username });  
        if (existingUser) {
            const Newuser =new User({username,password});
            Newuser.save()
            res.status(200).json(Newuser);
        }
        
    }catch(err){
        res.status(400).send("err to get data"+{err})
    }
});

export default router;