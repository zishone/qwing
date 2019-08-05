import * as jwt from "jsonwebtoken";
import { VError } from "verror";

import {
  mongo,
} from "./helpers/MongoDbHelper";

import { config } from "../config/config";

const context = async ({ req }) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded: any = jwt.verify(token, config.jwt.secret);
      const username = decoded.username;
      const client = decoded.client;
      mongo.setDb(config.app.name + client.replace(" ", "") + "DB");
      const userCheck = await mongo.findOne("users", { username }, {});
      if (userCheck) {
        return {
          mongo,
          username,
          client,
        };
      }
    }
  } catch (error) {
    console.log(error);
    throw new VError(error, `Error while contextifying`);
  }
};

export { context };
