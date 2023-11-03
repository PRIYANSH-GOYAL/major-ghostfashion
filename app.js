const path = require("path");
const express = require("express");
const app = express();
const PORT = 4444;
const mongoose = require("mongoose");
const hbs = require("hbs");
const Users = require("./models/user");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// app.get()
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/username", async (req, res) => {
  const { userName } = req.body;
  // console.log(username);
  await Users.create({
    userName
    // save()
  });
  res.render("b");
});
app.get("/username", (req,res)=>{
  res.render("b");
});

app.get("/pic", async (req, res)=>{
  try {
    const users = await Users.find();
    console.log(users);
    res.render("c",{
      users
    });
  } catch (error) {
    
  }
})

app.post("/pic", async (req, res) => {
  const { image } = req.body;
  console.log(image);
  await Users.create({
    image
  });
  res.redirect("/pic");
});
// app.post("/pic", async (req, res) => {
//   const { image } = req.body;
//   console.log(image);
//   await Users.create({
//     image
//   });
//   res.redirect("/pic");
// });

mongoose
  .connect(
    "mongodb+srv://priyansh:priyanshvansh@cluster0.w1vqwhi.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
