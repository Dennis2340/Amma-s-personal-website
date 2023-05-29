const Video = require('../Model/videos');
const uploadFileToFirebase = require("../helperFunctions/videoHelper")
const admin = require("firebase-admin")
const multer = require("multer");
const { storage } = require('firebase-admin');

const bucket = admin.storage().bucket("ammas-video-storage.appspot.com");

//////// THIS FUNCTION POST A VIDEO IN MONGODB ////////
const create = async function(req, res) {
  try {
    const { originalname, buffer } = req.file;
    const url = await uploadFileToFirebase(originalname, buffer);
    
    const video = await Video.create({
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


/////// This function get all the video urls from mongodb///////
const getAllVideos =  async (req, res) => {
  try {
    const videos = await Video.find({});
    const arrayOfVideoUrls= videos.map(video => {
      const url = video.videoUrl
      const filename = url.split("/")
      return filename[filename.length - 1]
    })

    
    
    return res.status(200).json({ videos,...arrayOfVideoUrls });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to get videos" });
  }
}


////// THIS FUNCTION A SINGLE URL FROM MONGODB
const getSingleVideo = async(req,res) => {

  try {
    const singleVideo = await Video.findById(req.params.id)
    if(!singleVideo) return res.status(404).json({message: "Video not found"})

    
    const url = singleVideo.videoUrl
    const filename = url.split("/")
    const filePath  = filename[filename.length - 1]
    
    // Get a reference to the video file in Firebase Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);

    // Stream the file contents to the client using the response object
    const stream = file.createReadStream();
    stream.on('error', (err) => {
      console.error(`Error streaming file ${filePath}:`, err);
      res.sendStatus(500);
    });
    stream.pipe(res);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    res.sendStatus(500);
  }
} 

/////// THIS FUNCTION DELETE URL FROM MONGODB BUT NOT FROM THE FIREBASE STORAGE
const deleteVideo =  async(req, res) => {
  try {
    ////// THIS CODE DELETE THE URL FROM MONGODB DATABASE ////////
    const singleVideo = await Video.findById(req.params.id)
    const deletedPoem = await Video.findByIdAndDelete(req.params.id);
    if (deletedPoem) {
      res.status(200).json({ message: "Video deleted" });
    } else {
      res.status(404).json({ message: "Video not found" });
    }

    //////// DELETE THE FILE FROM FIREBASE /////////
    const url = singleVideo.videoUrl
    const filename = url.split("/")
    const filePath  = filename[filename.length - 1]
    const fileRef = admin.storage().bucket().file(filePath);
  // Delete the file
    fileRef.delete()
     .then(() => {
       console.log('File deleted successfully.');
     })
      .catch((error) => {
    console.error('Error deleting file:', error);
  });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  create,
  getAllVideos,
  getSingleVideo,
  deleteVideo
}

