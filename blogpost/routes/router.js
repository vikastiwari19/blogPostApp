var express=require("express");
var router = express.Router();
var db=require('../config/db');


router.get("/",(req,res)=>
{
    let sql="SELECT * FROM posts";
    let query=db.query(sql,(err,rows) =>
    {
        if(err) throw err;
        res.render("home",{
            title:"Blog posts App",
            users : rows
    });  
    });     
});
router.get("/add",(req,res)=>
{
    res.render("add_blog",{
        title:"Blog posts App",
        check:"false"        
});
});

router.post("/save",(req,res)=>{
    let data={title: req.body.title , categories: req.body.categories, content: req.body.content};
    let sql="INSERT INTO posts SET ?";
    let query=db.query(sql,data,(err,result)=> {
       if(err) throw err;
       res.render("add_blog",{
           title:"Blog Post App",
           check:"true"
       })
    });
});

router.get("/show/:blogId",(req,res)=>{
 const blogId=req.params.blogId;
 let sql=`SELECT * FROM posts where id= ${blogId}`;
 let query=db.query(sql,(err,result) =>{
    if(err) throw err;
    res.render("show",{
        title:"Blog Description",
        user: result[0]
    });
 });
});

router.get("/edit/:blogId",(req,res)=>{
    const blogId=req.params.blogId;
    let sql=`SELECT * FROM posts where id= ${blogId}`;
    let query=db.query(sql,(err,result) =>{
       if(err) throw err;
       res.render("edit",{
           title:"Edit Blog",
           user: result[0],
           check:"false"
       });
    });
});

router.post("/update",(req,res)=>{
    const blogId=req.body.id;
    let sql="Update posts SET title='"+req.body.title+"',  categories='"+req.body.categories+"',  content='"+req.body.content+"' where id ="+blogId;
    let query=db.query(sql,(err,result)=> {
       if(err) throw err;
       res.render("edit",{
        title:"Edit Blog",
        user: result,
        check:"true"
       })
    });
});

router.get("/delete/:blogId",(req,res)=>{
    const blogId=req.params.blogId;
    let sql=`DELETE  FROM posts where id= ${blogId}`;
    let query=db.query(sql,(err,result) =>{
       if(err) throw err;
       res.redirect("/");
    });
});

module.exports = router;