import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { VError } from "verror";

import { mongo } from "../../helpers/MongoDbHelper";

import { config } from "../../../config/config";

const login = async (obj, args) => {
  try {
    mongo.setDb(config.app.name + args.client.replace(" ", "") + "DB");
    const user = await mongo.findOne("users", { username: args.username }, {});
    if (!user) {
      throw new VError("User not found");
    }
    const isValid = await bcrypt.compare(args.password, user.password);
    if (!isValid) {
      throw new VError("Password is incorrect");
    }
    user.jwt = jwt.sign({
      username: user.username,
      client: args.client,
    }, config.jwt.secret);
    user.client = args.client;
    return user;
  } catch (error) {
    throw new VError(error, `Error while logging in ${args.username}`);
  }
};

export { login };
