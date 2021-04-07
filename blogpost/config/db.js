const mysql=require("mysql");
const db=mysql.createConnection({
host:"localhost",
user:"assignments",
password:"root",
database:"blogpost"

});

module.exports=db;