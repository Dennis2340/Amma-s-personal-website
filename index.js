require("dotenv").config({path: './config/.env'})
require("express-async-errors")
const express = require("express");
const app = express();
const cors = require("cors")
const corsOption = require("./config/corsOption")
const port = process.env.PORT || 3600; // fixed typo and made it dynamic
const multer = require("multer")
const connectDB = require("./config/mongodb")
const poemController = require("./Controller/peomController")
const videoController = require("./Controller/videoController")
const storyController = require("./Controller/storyController")
const articleController = require("./Controller/articleController")
const motMessageController = require("./Controller/motMessageController")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const userController = require("./Controller/userController")
const verifyToken = require("./middleware/verifyJWT");
const handleHeaderError = require("./middleware/handlesHeaderError");
const admin = require("firebase-admin")
// connects to mongodb 
connectDB()

app.use(express.json());
app.use(cors(corsOption));

///////// THE PICTURE URL ///////////////
app.get("/user/userImage/:mainUrl", (req,res) => {
 try {
    const filename  = req.params.mainUrl

    const bucket = admin.storage().bucket();
    const file = bucket.file(filename);
   
     const stream = file.createReadStream();
     stream.on('error', (err) => {
       console.error(`Error streaming file ${filename}:`, err);
       res.sendStatus(500);
     });

     stream.pipe(res);
 } catch (error) {
     console.error(`Error reading file`, error);
      res.sendStatus(500);
 }
  
})

///////// This is the user Routes and RestApi //////////////////

app.get("/user/getUserInfo", userController.getUserInfo)
app.post("/user/register",upload.single("picture"), handleHeaderError,userController.addNewUser)
app.post("/user/login", userController.login)
app.put("/user/updateUser/:id", userController.updateUser)
app.delete("/user/deleteUser/:id", userController.deleteUser)
///////// This is the poem Routes and RestApi //////////////////
app.post("/poem/addPoem", verifyToken,poemController.addNewPoem);
app.get("/poem/getAllPoems", poemController.getAllPoems);
app.get("/poem/getSinglePoem/:id", poemController.getSinglePoem) 
app.delete("/poem/deletePoem/:id",verifyToken,poemController.deletePoem)
app.put("/poem/updatePoem/:id", verifyToken,poemController.updatePoem)
   
///////// This is the Video Routes and RestApi //////////////////
app.post("/addVideo",upload.single("video"), verifyToken,videoController.create)
app.get("/getAllVideos", videoController.getAllVideos)
app.get("/getSingleVideo/:id", videoController.getSingleVideo)
app.delete("/deleteSingleVideo/:id", verifyToken,videoController.deleteVideo)

///////// This is the Story Routes and RestApi //////////////////
app.post("/story/addStory",verifyToken, storyController.addNewStory);
app.get("/story/getAllStory", storyController.getAllStories);
app.get("/story/getSingleStory/:id", storyController.getSingleStory) 
app.delete("/story/deleteStory/:id",verifyToken, storyController.deleteStory)
app.put("/story/updateStory/:id",verifyToken, storyController.updateStory)

///////// This is the Article Routes and RestApi //////////////////
app.post("/article/addArticle",verifyToken, articleController.addNewArticle);
app.get("/article/getAllArticles", articleController.getAllArticles);
app.get("/article/getSingleArticle/:id", articleController.getSingleArticle) 
app.delete("/article/deleteArticle/:id",verifyToken, articleController.deleteArticle)
app.put("/article/updateArticle/:id",verifyToken, articleController.updateArticle)

///////// This is the Article Routes and RestApi //////////////////
app.post("/motMessage/addMotMessage",verifyToken, motMessageController.addNewMotMessage);
app.get("/motMessage/getAllMotMessage", motMessageController.getAllMotMessage);
app.get("/motMessage/getSingleMotMessage/:id", motMessageController.getSingleMotMessage) 
app.delete("/motMessage/deleteMotMessage/:id",verifyToken, motMessageController.deleteMotMessage)
app.put("/motMessage/updateMotMessage/:id",verifyToken, motMessageController.updateMotMessage)

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
