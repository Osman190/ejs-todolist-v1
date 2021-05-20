const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

let items = [];

app.get("/", function(req, res){

  // the simplest way to target the weekdays with JS Hardcoded.
  // let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // let today = new Date();
  // let currentDay = today.getDay();
  // let dayName = days[currentDay];
  // let day = ""
  // if(!day) day = dayName
  // res.render("list", {kindOfDay: day})
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let date = new Date()
  let currentDay = date.toLocaleDateString("en-US", options)

  res.render("list", {kindOfDay: currentDay, newListItems: items })

});

app.post("/", function(req, res) {
  const item = req.body.newItem;

  items.push(item)
  
  res.redirect("/")


})

app.listen(3000, () => {
  console.log("Server is Running....... On PORT 3000 ");
});