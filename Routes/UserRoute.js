const express = require("express");
const UserRoute = express.Router();
const UserModel = require("../Modals/User.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Authenticate } = require("../Middleware/Auth");
const TaskModel = require("../Modals/Task.Model");

UserRoute.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
      // Store hash in your password DB.
      await UserModel.create({ name, email, password: hash });
      res.send("Registered successful");
    });
  } catch (error) {
    console.log(error);
  }
});


UserRoute.get('/',Authenticate,async (req,res)=>{
  try {
    const userId=req.userId;
    const userData=await UserModel.findOne({_id:userId});
    res.send(userData);
  } catch (error) {
    console.log(error);
  }
})

UserRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    let userData = await UserModel.findOne({ email: email });
    if (!userData) {
      return res.send({message:"User Not Registered"});
    } else {
      bcrypt.compare(password, userData.password, async function (err, result) {
        if (err) {
          return res.send({message:"wrong password"});
        } else {
          const userObj = {
            userId: userData._id,
          };
          var token = jwt.sign(userObj, "secret");
          res.send(token);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

UserRoute.patch('/change/:Id',Authenticate,async (req,res)=>{
    try {
        let {Id}=req.params;
        const input=req.body;
        const task=await TaskModel.updateMany({authorId:Id},{$set : {profileImg:input.image}})
        await UserModel.findByIdAndUpdate(Id,input);
        res.send('updated successfully');
    } catch (error) {
        console.log(error);
    }
})


module.exports=UserRoute;