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

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
