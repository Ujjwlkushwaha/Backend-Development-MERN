const express = require('express')
const app = express();
const port = 8080;
const path = require('path');
const urlRouter = require('./routes/url');
const mongoose = require('mongoose');

// connect db
mongoose.connect('mongodb://localhost/url-shortener')
 .then(()=>{
        console.log('Connected to MongoDB');
 }).catch((err)=>{
        console.error(err);
 })

app.set('view engine' , 'ejs');
app.set('views' ,path.join(__dirname , 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use('/url', urlRouter);


app.get('/' , (req , res) => {
    res.render('urlAnalytics.ejs');
});

app.listen(port , (err) =>{
    if(err) console.error(err);
    console.log(`Server is running on port ${port}`);
});