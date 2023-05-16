var http = require("http");
const express=require("express");
// const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// var bname;
// const {createPool}=require('mysql');
// const pool =createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "lib",
//     connectionLimit:10
// })
// var inc;
// // pool.connect();
// // pool.query('select * from allbooks',(err,result,fields)=>{
// //     if(err){
// //         return console.log(err);
// //     }
// //     return console.log(result);
// // })
// // http
// //   .createServer(function (req, res) {
// //     if (req.url == "/list.html") {
// //       // redirect to page-b.html with 301 (Moved Permanently) HTTP code in the response
// //       res.writeHead(301, { Location: "http://" + req.headers["host"] + "/enter.html" });
// //       return res.end();
// //   }
// // })

// // Importing MySQL module
// const mysql = require("mysql");
  
// // Creating connection
// // let db_con = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: "",
// //   database: "lib"
// // });
  
// // Connect to MySQL server
// // db_con.connect((err) => {
// //   if (err) {
// //     console.log("Database Connection Failed !!!", err);
// //   } else {
// //     console.log("connected to Database");
// //   }
// // });
  
// // module.exports = db_con;
// app.get("/",function(req,res){
//     res.sendFile(__dirname+ "/list.html");
//     // bname=req.body.book;
//     // var sql1 = 'INSERT INTO allbooks VALUES (bname, 1)';
//     // pool.query(sql1, bname,function (err) { 
//     //     if (err){
//     //         res.send(err);
//     //     }
//     //     else{
//     //         res.send("Book added");
//     //     }
//     // })
// });
// app.post("/enter",function(req,res){

//     res.sendFile(__dirname+ "/enter.ejs");
//     bname=req.body.book;

//   res.render("enter", { book: bname});

// app.post("/",function(req,res){
    
//     const details=req.body;
//     // inc=req.body.ret;
//     // if(inc==false){
//         // res.redirect("/enter");
//     // }
//     // else if(inc==true){
//         var sql2 = 'INSERT INTO issued SET ?';
//         pool.query(sql2, details,function (err) { 
//             if (err){
//                 res.send("Reload or go back");
//                 // res.send("You already have a borrowed book. Please return it.");
//             }
//             // res.send(inc);
//             // if(inc=="true")
//             // else
//             res.send("Book issued"); 
//     //         // res.send(http.STATUS_CODES)
//     })
//     }
// );
 
// })
const mysql = require('mysql');
const { unzipSync } = require("zlib");
var bn;
var susn;
var sn;
const errors = [];
// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lib'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});
app.get("/",function(req,res){
    res.sendFile(__dirname+ "/list.html");
    // bname=req.body.book;
});
app.post("/enter",function(req,res){
    
    res.sendFile(__dirname+ "/enter.ejs");
    bn=req.body.book;
    susn=req.body.usn;
    sn=req.body.sname;
  res.render("enter", { book: bn});
})
app.post("/",function(req,res){
  const { usn, sname, bname} = req.body;

    const data = { usn,sname, bn };
    const q2='SELECT * FROM issued WHERE usn = usn';
    const query = 'INSERT INTO issued SET ?';
    connection.query(q2, function(errr,rest){
      if(q2){
      res.send("You have already borrowed a book. Please return it.");
      res.send(rest);
      }
      else{
        connection.query(query, data, (err, result) => {
          if (err) throw err;
          console.log('Data inserted successfully');
          // res.redirect('/');
          res.send("Book issued");
        });
      }
    })
    
  
  });
  app.post("/all",function(req,res){
    
  })
 
 
  // Close the database connection
  // connection.end((err) => {
  //   if (err) throw err;
  //   console.log('Disconnected from the MySQL database');
  // });




app.listen(2023);