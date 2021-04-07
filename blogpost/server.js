const express=require("express");
const app=express();
const path=require("path");
const bodyParser=require("body-parser")
const db=require("./config/db")
const usersRouter = require('./routes/router');

const partialPath=path.join(__dirname,"/partials");
// to set the view engine
app.set("view engine", "ejs");
app.use('/css',express.static(path.resolve(__dirname,"public/css")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

db.connect(function(err){
    if(err) console.log(err);
    else console.log("Database Connected"); 
})

app.use('/', usersRouter);

app.listen(3000,() =>
{
    console.log("listening the port at 3000");
});