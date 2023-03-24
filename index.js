require("dotenv").config({path: './config/.env'})
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const corsOption = require("./config/corsOption")
const port = process.env.PORT || 3600; // fixed typo and made it dynamic

const connectDB = require("./config/mongodb")
const peom = require("./Model/peoms");
const poem = require("./Model/peoms");
const poemController = require("./Controller/peomController")
// connects to mongodb 
connectDB()

app.use(express.json());
app.use(cors(corsOption));

app.post("/addPoem", poemController.addNewPoem);

app.get("/getAllPoems", poemController.getAllPoems);
app.get("/getSinglePoem/:id", poemController.getSinglePoem) 

app.delete("/deletePoem/:id", poemController.deletePoem)

app.put("/updatePoem/:id", poemController.updatePoem)




app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
