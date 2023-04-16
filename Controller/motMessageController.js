const { set } = require("mongoose");
const { format } = require("date-fns")
const { formatDistanceToNow } = require("date-fns");
const motMessage = require("../Model/motMessages");
// add new peom and prevent duplication also!!!
const addNewMotMessage = async(req, res) => {
    if(!req?.body?.motMessageTitle || !req?.body?.motMessageGenre || !req?.body?.motMessageDetails || !req?.body?.motMessageAuthor){
        return res.status(400).json({message : "motMessage title, motMessage genre, motMessage author and motMessage details are required"});
    }
    try{
        const isDuplicate = await motMessage.exists({  
            motMessageTitle: req.body.motMessageTitle ,
            motMessageGenre: req.body.motMessageGenre ,
            motMessageDetails: req.body.motMessageDetails,
            motMessageAuthor : req.body.motMessageAuthor
          });
      
          if (isDuplicate) {
            return res
              .status(400)
              .json({ message: "motMessage title, genre or details already exist" });
          }
        const result = await motMessage.create({
            motMessageTitle: req.body.motMessageTitle,
            motMessageGenre: req.body.motMessageGenre,
            motMessageDetails: req.body.motMessageDetails,
            motMessageAuthor : req.body.motMessageAuthor,
            createdAt: format(new Date(), "MMMM-dd',' yyyy hh:mm aaa")
        });
       
        console.log("new motMessage added");
        return res.status(201).json({message: "New motMessage added."});
    } catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
};

const getAllMotMessage =  async (req, res) => {
    try {
      const motMessages = await motMessage.find({});
      return res.status(200).json({ motMessages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to get motMessages" });
    }
  }

 const getSingleMotMessage = async(req,res) => {
    try{
       const singleMotMessage = await motMessage.findById(req.params.id)
       if(!singleMotMessage) return res.status(404).json({message: "motMessage not found"})
       res.status(200).json(singleMotMessage)
    }catch(err) {
        console.log(err)
        res.status(500).json({message: "Unable to get the motMessage"})
    }
 } 

 const updateMotMessage = async (req, res) => {
  try {
    if (!req?.body) return res.status(400).json({ message: "Nothing to be updated" });
    
    const updatedMotMessage = await motMessage.findByIdAndUpdate(req.params.id, {
      motMessageTitle: req.body.motMessageTitle,
      motMessageGenre: req.body.motMessageGenre,
      motMessageDetails: req.body.motMessageDetails,
      motMessageAuthor: req.body.motMessageAuthor,
      updatedAt: format(new Date(), "MMMM-dd',' yyyy hh:mm aaa")
    }, { new: true });

    res.status(200).json({ updatedMotMessage });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}


 const deleteMotMessage =  async(req, res) => {
    try {
      const deletedMotMessage = await motMessage.findByIdAndDelete(req.params.id);
      if (deletedMotMessage) {
        res.status(200).json({ message: "MotMessage deleted" });
      } else {
        res.status(404).json({ message: "MotMessage not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

 module.exports = {
    addNewMotMessage,
    getAllMotMessage,
    getSingleMotMessage,
    updateMotMessage,
    deleteMotMessage
 } 