require("dotenv").config({path: './config/.env'})
const express = require("express");
const app = express();
const cors = require("cors")
const corsOption = require("./config/corsOption")
const port = process.env.PORT || 3600; // fixed typo and made it dynamic

const peom = require("./Model/peoms")

app.use(express.json());
app.use(cors(corsOption));

app.get("/hello", (req, res) => {
    return res.json({ message: "I am saying hello" });
});

app.post("/newPeom", async(req, res) => {
   const newPeom = req.body
   await peom.add({newPeom})
   res.status(201).json({msg: "new peom created"})
})

app.get("/", async(req, res) => {
  const snapshot = await peom.get()
  const listOfPeoms = snapshot.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  res.status(200).json({listOfPeoms})

})

// app.put("/update", async(req, res) => {
//   const { data } = req.data
//   if(!data || data.length === 0){
//     return res.status(201).send({msg: "The peom list is empty"})
//   }
//   const id = data.id
//   await peom.doc(id).update(req.body)

// })

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
