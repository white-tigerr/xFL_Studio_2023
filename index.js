
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "India123@"
});




app.get('/app/tasks', (req, res) => {
  var sql = `SELECT * from todolist `;
  
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
  
  res.render("form");
})

app.post('/app/tasks', (req, res) => {
    console.log(req);
    const title  = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const duedate = req.body.duedate;

  var sql = `INSERT INTO todolist 
  VALUES ('${title}', ${description},${category},${duedate})`;
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})