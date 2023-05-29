const { set } = require("mongoose");
const stories = require("../Model/stories")
const { format } = require("date-fns")
const { formatDistanceToNow } = require("date-fns")
// add new peom and prevent duplication also!!!
const addNewStory = async(req, res) => {
    if(!req?.body?.storyTitle || !req?.body?.storyGenre || !req?.body?.storyDetailed || !req?.body?.storyAuthor){
        return res.status(400).json({message : "story title, story genre, story author and story details are required"});
    }
    try{
        const isDuplicate = await stories.exists({  
            storyTitle: req.body.storyTitle ,
            storyGenre: req.body.storyGenre ,
            storyDetailed: req.body.storyDetailed,
            storyAuthor : req.body.storyAuthor
          });
      
          if (isDuplicate) {
            return res
              .status(400)
              .json({ message: "Story title, genre or details already exist" });
          }
        const result = await stories.create({
            storyTitle: req.body.storyTitle,
            storyGenre: req.body.storyGenre,
            storyDetailed: req.body.storyDetailed,
            storyAuthor : req.body.storyAuthor,
            createdAt: format(new Date(), "MMMM-dd',' yyyy hh:mm aaa")
        });
       
        console.log("new story added");
        return res.status(201).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"});
    }
};

const getAllStories =  async (req, res) => {
    try {
      const story = await stories.find({});
      return res.status(200).json({ story });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to get stories" });
    }
  }

 const getSingleStory = async(req,res) => {
    try{
       const singleStory = await stories.findById(req.params.id)
       if(!singleStory) return res.status(404).json({message: "Story not found"})
       res.status(200).json(singleStory)
    }catch(err) {
        console.log(err)
        res.status(500).json({message: "Unable to get the story"})
    }
 } 

 const updateStory = async (req, res) => {
  try {
    if (!req?.body) return res.status(400).json({ message: "Nothing to be updated" });
    
    const updatedStory = await stories.findByIdAndUpdate(req.params.id, {
      storyTitle: req.body.storyTitle,
      storyGenre: req.body.storyGenre,
      storyDetails: req.body.storyDetails,
      storyAuthor: req.body.storyAuthor,
      updatedAt: format(new Date(), "MMMM-dd',' yyyy hh:mm aaa")
    }, { new: true });

    res.status(200).json({ updatedStory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}


 const deleteStory =  async(req, res) => {
    try {
      const deletedStory = await stories.findByIdAndDelete(req.params.id);
      if (deletedStory) {
        res.status(200).json({ message: "Story deleted" });
      } else {
        res.status(404).json({ message: "Story not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  }

 module.exports = {
    addNewStory,
    getAllStories,
    getSingleStory,
    updateStory,
    deleteStory
 } 