const { set } = require("mongoose");
const users = require("../Model/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const rolesEmail = require("../config/roles_lists")
const uploadFileToFirebase = require("../helperFunctions/videoHelper");
const user = require("../Model/users");

const addNewUser= async(req, res) => {
    if(!req?.body?.userName || !req?.body?.userEmail || !req?.body?.userPassword){
        return res.status(400).json({message : "Name, Email and Password of the user are required"});
    }
    try{

        const {  userEmail } = req.body
        if(userEmail  !== rolesEmail[0]) return res.status(500).json({msg : "You are not authorized to register"})
 
        const { originalname, buffer } = req.file;
        const url = await uploadFileToFirebase(originalname, buffer)
        const passwordHashed = await bcrypt.hash(req.body.userPassword, 10)

        const isDuplicate = await users.exists({  
            userName: req.body.userName,
            userEmail: req.body.userEmail,
           
          });
      
          if (isDuplicate) {
            return res
              .status(400)
              .json({ message: "This user already exists and it should be a maximum of one user for this routes" });
          }

      
       
        const result = await users.create({
           userName: req.body.userName,
           userEmail: req.body.userEmail,
           userPhoneNumber: req.body.userPhoneNumber,
           userDescription : req.body.userDescription,
           userPassword: passwordHashed,
           pictureUrl : url
        });

        const savedUser = await result.save();
        const newUrl = savedUser.pictureUrl
        const filename = newUrl.split("/")
        const picture = filename[filename.length - 1]
        res.status(201).json({savedUser,picture})
       
        console.log("new user added");
       
    } catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error", error});
    }
};

const userInfo = async(req,res) => {
 try {
    const response = await user.find({})
    return res.status(200).json({ response });

 } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: "Unable to get user" });
 }
}
const updateUser = async(req, res) => {
    try {
        if (!req?.body) return res.status(400).json({ message: "Nothing to be updated" });
        const passwordHashed = await bcrypt.hash(req.body.userPassword, 10)
        const updatedUser = await users.findByIdAndUpdate(req.params.id, {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPhoneNumber: req.body.userPhoneNumber,
            userDescription : req.body.userDescription,
            userPassword: passwordHashed
        }, { new: true });
    
        res.status(200).json({ updatedUser });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
      }
}

const login = async (req, res) => {
    try {
        const { userEmail, userPassword }  = req.body
        const user = await users.findOne({ userEmail : userEmail})
        if(!user) return res.status(400).json({msg: "User Does not exist"})

        const isMatch = await bcrypt.compare(userPassword, user.userPassword)
        if(!isMatch) return res.status(400).json({msg : "Invalid credentials"})

        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET)
        delete user.userPassword
        res.status(200).json({ token, user})
    } catch (error) {
        res.status(500).json({ error : error.message})
    }
}


module.exports = {
    addNewUser,
    login,
    updateUser,
    userInfo
}