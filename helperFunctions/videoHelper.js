 const serviceAccount = require("../config/ammas-video-storage-firebase-adminsdk-migd6-83bf9a89e7.json");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require('uuid');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ammas-video-storage.appspot.com'
});

const bucket = admin.storage().bucket();

const uploadFileToFirebase = async function(originalname, buffer) {
  const uuid = uuidv4();
  const fileName = uuid + "-" + originalname;
  const file = bucket.file(fileName);
  
  // file.makePublic()
  // .then(() => {
  //   console.log(`File ${fileName} is now publicly accessible`);
  // })
  // .catch((err) => {
  //   console.error(`Error making file ${fileName} public: ${err}`);
  // });
  await file.save(buffer, {contentType: "multipart/form-data"}, function(err) {
    if (err) {
      throw new Error(`Failed to upload file ${fileName}: ${err}`);
    }
  });

  const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  return url;
}

module.exports = uploadFileToFirebase;
