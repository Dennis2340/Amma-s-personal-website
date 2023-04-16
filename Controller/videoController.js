const Video = require('../Model/videos');
const uploadFileToFirebase = require("../helperFunctions/videoHelper")
const admin = require("firebase-admin")
const multer = require("multer");
const { storage } = require('firebase-admin');

const bucket = admin.storage().bucket("ammas-video-storage.appspot.com");
// POST /videos
const create = async function(req, res) {
  try {
    
    
    const { originalname, buffer } = req.file;
    const url = await uploadFileToFirebase(originalname, buffer);
    console.log(url)

    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl : url,
    
      duration: 120 
    });

    await video.save();
    
    res.status(201).json({
      success: true,
      message: 'Video created successfully.',
      data: video
    });
}catch(error){
console.log(error)
}
}

// GET VIDEOS



// fetch all the files from buckets
async function fetchAllFilesFromBucket() {
  try {
   
    const [files] = await bucket.getFiles();
    console.log(`Found ${files.length} files`);

    for (const file of files) {
      const fileName = file.name.split("/").pop();
      
      // Check if file exists in video collection
      const video = await Video.findOne({ fileUrl: `https://storage.googleapis.com/${bucket.name}/${fileName}` });
      if (!video) {
        console.log(`Video with file ${fileName} not found`);
        continue;
      }
    

        // Update video document with new metadata
      const metadata = await file.getMetadata();
      await Video.updateOne({ _id: video._id }, {
         $set: {
          title: req.body.title,
          description: req.body.description,
          videoUrl : url,
        
          duration: 120 
          },
        });

        

         console.log(`Updated video with file ${fileName}`);
    }
    
  } catch (error) {
    console.error(`Error fetching files from Firebase Storage: ${error}`);
  
}
}

const getAllVideos =  async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.status(200).json({ videos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to get poems" });
  }
}

const getSingleVideo = async(req,res) => {
  try{
     const singleVideo = await Video.findById(req.params.id)
     if(!singleVideo) return res.status(404).json({message: "Video not found"})
     res.status(200).json(singleVideo)
  }catch(err) {
      console.log(err)
      res.status(500).json({message: "Unable to get the Video"})
  }
} 

const deleteVideo =  async(req, res) => {
  try {
    const deletedPoem = await Video.findByIdAndDelete(req.params.id);
    if (deletedPoem) {
      res.status(200).json({ message: "Video deleted" });
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  create,
  fetchAllFilesFromBucket,
  getAllVideos,
  getSingleVideo,
  deleteVideo
}

