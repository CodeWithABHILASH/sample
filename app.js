
const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Book=require('./models/book')
const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))



mongoose.connect('mongodb://localhost:27017/camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});





app.get('/home',(req,res)=>{
    res.render('home.ejs');
})


app.get('/bookings',async(req,res)=>{
   const books=await Book.find({})
 res.render('book.ejs',{books})
})

app.get('/schemas',(req,res)=>{
    res.render('schemas.ejs')
})
app.get('/',(req,res)=>{
    res.redirect('/home')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})