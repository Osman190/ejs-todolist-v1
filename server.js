const express = require('express');
const date = require(`${__dirname}/date.js`)

const app = express()

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))


const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];


app.get("/", function(req, res) {
  const day = date.getDate();
  res.render("index", {listTitle: day, newListItems: items})
})

app.post("/", function (req, res) {
  const item = req.body.newItem;
  if(req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }
})

app.get("/work", function(req, res) {
  res.render("index", {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItem.push(item)
  res.redirect("/")
})

app.get("/about", function(req, res) {
  res.render("about")
})


app.listen(3000, () => {
  console.log("Server is running ya prance on PORT 3000");
})