import mongoConfig from "../configs/mongodb.config"
import mongoose from "mongoose";
import logger from "../utils/logger";

const mongooseConnection = {
    init: () => {
        const mongoConString = mongoConfig.conString;
        if(!mongoConString)
        {
            const error = "MongoDB connection string not detected";
            logger.error(error);
            throw new Error(error);
        }

        const hostname = mongoConString.split('@')[1];

        mongoose
          .connect(
            mongoConString!,
            {
              autoIndex: true
            })
          .then(() => {
            logger.success(`Mongoose connected to ${hostname} successfully`);
          })
          .catch((err) => {
            logger.error(`Mongoose connected to ${hostname} failed 
            \nError:
            \n${err}`)
          });
    }
}

export default mongooseConnection;