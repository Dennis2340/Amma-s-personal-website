// Connection to MongoDB
const mongoose = require("mongoose")

const connectDB = async () => {
  console.log('MongoDB connection with retry');
  try{

  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
    })
    
}catch(err) {
  console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
  setTimeout(connectDB, 5000);
  console.log(err)
  };
}

module.exports = connectDB