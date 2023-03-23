const peomCollection = require("../Model/peoms")

// // const getAllPeoms = async(req,res) => {
// //    const peoms = await peomCollection
// // }

// const getAllPeoms = async(req, res) => {
//     const snapshot = await peomCollection.get()
//     if(!snapshot){
//         return res.sendStatus(204).json({message: "no peoms in this collection! please create one"})
//     }
//     const listOfPeoms = snapshot.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }))
//     res.status(200).json({listOfPeoms})
  
//   }

//   // create a peom
//   const createNewPeom = async(req, res) => {
//     if(!req?.body?.title || !req?.body?.detail){
//         return res.sendStatus(204).json({message: "title and detail field required"})
//     }

//     const newPeom = req.body
//     await peom.add({newPeom})
//     res.status(200).json({msg: "new peom created"})
//  }