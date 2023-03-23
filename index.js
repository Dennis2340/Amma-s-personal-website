require("dotenv").config({path: './config/.env'})
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const corsOption = require("./config/corsOption")
const port = process.env.PORT || 3600; // fixed typo and made it dynamic

const connectDB = require("./config/mongodb")
const peom = require("./Model/peoms")

// connects to mongodb 
connectDB()

app.use(express.json());
app.use(cors(corsOption));

app.post("/addPoem", async(req, res) => {
    if(!req?.body?.poemTitle || !req?.body?.poemGenre || !req?.body?.poemDetails){
        return res.status(400).json({message : "Poem title, poem genre and poem details are required"});
    }
    try{
        const result = await peom.create({
            poemTitle: req.body.poemTitle,
            poemGenre: req.body.poemGenre,
            poemDetails: req.body.poemDetails
        });

        console.log("new poem added");
        return res.status(201).json({message: "New poem added."});
    } catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
});

app.get("/getAllPoems", async (req, res) => {
    try {
      const poems = await peom.find({});
      return res.status(200).json({ poems });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to get poems" });
    }
  });

  app.delete("/deletePoem/:id", async(req, res) => {
    try {
      const deletedPoem = await peom.findByIdAndDelete(req.params.id);
      if (deletedPoem) {
        res.status(200).json({ message: "Poem deleted" });
      } else {
        res.status(404).json({ message: "Poem not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  })




app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
