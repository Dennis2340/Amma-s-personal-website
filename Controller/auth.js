// const users = require("../Model/users")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// /////// REGISTER //////

// export const register = async(req, res) => {
//   try {
//      const { userName, userEmail, userPassword} = req.body

//      const passwordHashed = await bcrypt.hash(userPassword, 10)
//      const savedUser = await 
//      res.status(201).json({})
//   } catch(error){
//     res.status(500).json({ msg : error.message})
//   }
// }



// ////////  LOGGING IN ////////

// export const login = async (req, res) => {
//     try {
//         const { userEmail, userPassword }  = req.body
//         const user = await users.findOne({ email : userEmail})
//         if(!user) return res.status(400).json({msg: "User Does not exist"})

//         const isMatch = await bcrypt.compare(userPassword, user.userPassword)
//         if(!isMatch) return res.status(400).json({msg : "Invalid credentials"})

//         const token = jwt.sign({ id: _id}, process.env.JWT_SECRET)
//         delete user.userPassword
//         res.status(200).json({ token, user})
//     } catch (error) {
//         res.status(500).json({ error : error.message})
//     }
// }