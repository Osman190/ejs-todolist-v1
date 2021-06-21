const express = require('express');
// const date = require(`${__dirname}/date.js`)
const mongoose = require("mongoose");

const app = express()

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

mongoose.connect("mongodb+srv://admin-elbehary:Test123@todo-list.7gftu.mongodb.net/todoListDB", {useNewUrlParser: true, useUnifiedTopology: true});
const itemsSchema = {
  name: {
    type: String,
    required: true
  }
}

const Item = mongoose.model("Item", itemsSchema);

const itemsOne = new Item({ name: "get the shit out of here!"});
const itemsTwo = new Item({ name: "Sollicitudin!"});
const itemsThree = new Item({ name: "Nam sit orci massa quam himenaeos accumsan porttitor!"});

const defaultItems = [itemsOne, itemsTwo, itemsThree];

const listSchema = {
  name: String,
  list: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  // const day = date.getDate();
  
  Item.find({}, function (err, foundItem) {
    if (err) {
      console.log(err);
    } else {
      if(foundItem.length === 0) {
        Item.insertMany(defaultItems, function(err) {
          if(err) {
            console.log(err);
          } else {
          console.log("Successfully add to the database!");
          }
        })
        res.redirect("/")
      } else {
        res.render("index", {listTitle: "Today", newListItems: foundItem})
      }
    }
  })
  
})

app.post("/", function (req, res) {
  const item = req.body.newItem;
  console.log(item);
  if(req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    const newValue = new Item({ name: item});
    newValue.save();
    res.redirect("/")
  }
})

app.post("/delete", function(req, res) {
  const checkedItem = req.body.checkbox;
  Item.findByIdAndRemove(checkedItem, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Done! 🐪");
      res.redirect("/")
    }
    
  })
})

app.get("/:newList", function(req, res) {
  const customList = req.params.newList;
  List.findOne({name: customList}, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      if(!result) {
        console.log("Not exists");
      } else {
        console.log("The shit is already exists");
      
      }
    }
  })
  const list = new List({
    name: customList,
    list: defaultItems
  })
  list.save();
  // res.render("index", {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItem.push(item)
  res.redirect("/")
})

app.get("/about", function(req, res) {
  res.render("about")
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
  console.log("Server is running ya prance on PORT 3000");
})