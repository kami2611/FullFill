const Shoes = require('./models/shoes');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const upload = multer({dest:'uploads/'})
mongoose.connect('mongodb://127.0.0.1:27017/oneDegree').then(() => {
    console.log("Mongoose Server Started!");
}).catch((err) => {
    console.log("Err mongoose!");
});

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');



app.get('/', (req, res)=>{
    res.render('home');
});
app.get('/addShoes', (req, res)=>{
    res.render('addShoesForm');
});
app.post('/addShoes',upload.single('image'), async(req, res)=>{
    const {name, price} = req.body;
    const imgUrl = `/uploads/${req.file.filename}`;
    const newShoes = new Shoes({
        name:name,
        price:price,
        imgs:imgUrl,
    });
    await newShoes.save();
    res.redirect('/collections');
})
app.get('/deleteAllShoes',async(req, res)=>{
    await Shoes.deleteMany();
    res.send('All Shoes deleted');
})

app.get('/collections', async(req, res)=>{
    const AllShoes = await Shoes.find();
    res.render('collections', {AllShoes});
});
app.get('/collections/:id', async(req, res)=>{
    const {id} = req.params;
    const shoe = await Shoes.findById(id);
    res.render('shoeLandingPage', {shoe});
});

app.listen('3000', ()=>{
    console.log('ON PORT 3000!');
});
