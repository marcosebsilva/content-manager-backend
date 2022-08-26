import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

/** Uses URL provided by .env or try to use URI related to the docker container defined in @/docker-compose.yml */
const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/content-manager-db`

/** Reference for options in https://mongoosejs.com/docs/connections.html */
const connectionOptions = {}

export default () => mongoose.connect(MONGO_URL, connectionOptions)
  .then(() => {
    console.log("Mongoose connected!");
  })
  .catch((error) => {
    console.log(error);
    throw error;
  })