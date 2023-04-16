require("dotenv").config({path: './config/.env'})
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
// connects to mongodb 
connectDB()

app.use(express.json());
app.use(cors(corsOption));

///////// This is the poem Routes and RestApi //////////////////
app.post("/poem/addPoem", poemController.addNewPoem);
app.get("/poem/getAllPoems", poemController.getAllPoems);
app.get("/poem/getSinglePoem/:id", poemController.getSinglePoem) 
app.delete("/poem/deletePoem/:id", poemController.deletePoem)
app.put("/poem/updatePoem/:id", poemController.updatePoem)

///////// This is the Video Routes and RestApi //////////////////
app.post("/addVideo",upload.single("video") ,videoController.create)
app.get("/getAllVideos", videoController.getAllVideos)
app.get("/getSingleVideo/:id", videoController.getSingleVideo)
app.get("/deleteSingleVideo/:id", videoController.deleteVideo)

///////// This is the Story Routes and RestApi //////////////////
app.post("/story/addStory", storyController.addNewStory);
app.get("/story/getAllStory", storyController.getAllStories);
app.get("/story/getSingleStory/:id", storyController.getSingleStory) 
app.delete("/story/deleteStory/:id", storyController.deleteStory)
app.put("/story/updateStory/:id", storyController.updateStory)

///////// This is the Article Routes and RestApi //////////////////
app.post("/article/addArticle", articleController.addNewArticle);
app.get("/article/getAllArticles", articleController.getAllArticles);
app.get("/article/getSingleArticle/:id", articleController.getSingleArticle) 
app.delete("/article/deleteArticle/:id", articleController.deleteArticle)
app.put("/article/updateArticle/:id", articleController.updateArticle)

///////// This is the Article Routes and RestApi //////////////////
app.post("/motMessage/addMotMessage", motMessageController.addNewMotMessage);
app.get("/motMessage/getAllMotMessage", motMessageController.getAllMotMessage);
app.get("/motMessage/getSingleMotMessage/:id", motMessageController.getSingleMotMessage) 
app.delete("/motMessage/deleteMotMessage/:id", motMessageController.deleteMotMessage)
app.put("/motMessage/updateMotMessage/:id", motMessageController.updateMotMessage)

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
