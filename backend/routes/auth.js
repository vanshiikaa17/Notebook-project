const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')

//ROUTE:1 creating a new user
router.post(
  "/newuser",
  [
    //checking for errors
    body("name", "Name must have atleast 3 characters").isLength({ min: 3 }),
    body("email", "Invalid E-mail format").isEmail(),
    body("password", "password must have atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
        //check if the user already exists
      let user = await User.findOne({email: req.body.email });
      if (user) {
        return res.status(400).json({success, error:"User already exists."});
      }

      //genetating salt
      const salt=await bcrypt.genSalt(10);
      securedPassword=await bcrypt.hash(req.body.password, salt);


      // new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });


      const userID={
        user:{
            id:user.id
        }
      }
      const authToken=jwt.sign(userID, process.env.JWT_SECRET);
      success=true;
    const userName=user.name;

     res.json({success,"authToken":authToken, userName});
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 2: authenticating users: login endpoint

router.post('/loginuser', [
    body("email", "Invalid E-mail format").isEmail(),
    body("password", "password cannot be blank").exists()

], async(req,res)=>{
  let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

const {email, password}=req.body;
try{
let user= await User.findOne({email});
if(!user){
    return res.status(400).json({success, error:"Invalid credentials"});
}
//comparing the entered password with the already stored password
const enteredPass=await bcrypt.compare(password, user.password);
if(!enteredPass){
    return res.status(400).json({success, error:"Invalid credentials"});
}
const userID={
    user:{
        id:user.id
    }
  }
const userName=user.name;
  const authToken=jwt.sign(userID, process.env.JWT_SECRET);
  success=true;
  // console.log(user.name);
 res.json({success, "authToken":authToken, userName});

}catch(error){
    res.status(500).send("Internal server error");
}
}
);

//ROUTE 3: Get user details: login required
router.post('/getuser',fetchuser, async(req,res)=>{
   try{
    //fetching thr user id from req via fetchuser
    userID=req.user.id;
    const user=await User.findById(userID).select("-password");
    res.json(user);
   }catch(error){
    res.status(500).json("Internal server error");
   }
})
module.exports = router;
