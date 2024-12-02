const express = require("express");
const dbConnect = require("./config/dbconnect");
const userModel = require("./models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
dbConnect();
const port = 8000;

app.post("/registration", async (req, res) => {
  let { name, email, password } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    let user = new userModel({
      name,
      email,
      password: hash,
    });
    await user.save();
    res.status(201).send({ user });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let existinguser = await userModel.findOne({ email });
  if (existinguser) {
    bcrypt.compare(password, existinguser.password, function (err, result) {
      if (result) {
        var token = jwt.sign({ email }, "shhhhh");
        console.log(token);
        return res.status(200).send({ message: "Login Successfully", token });
      } else {
        return res.status(400).send({ message: "Invalid User or Password " });
      }
    });
  } else {
    return res.status(400).send({ message: "Invalid User or Password " });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is runing http://localhost:${port}`);
});
