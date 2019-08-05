import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { VError } from "verror";

import { mongo } from "../../helpers/MongoDbHelper";

import { config } from "../../../config/config";

const register = async (obj, args) => {
  try {
    await mongo.setDb("QPalDB");
    const existingClient = await mongo.findOne("clients", { email: args.email }, {});
    if (existingClient) {
      throw new VError("Email already used");
    }
    await mongo.insertOne("clients", {
      name: args.name,
      email: args.email,
    }, {});
    mongo.setDb(config.app.name + args.name.replace(" ", "") + "DB");
    const hash = await bcrypt.hash(args.password, config.bcrypt.salt);
    await mongo.insertOne("users", {
      username: "admin",
      email: args.email,
      password: hash,
    }, {});
    const user = await mongo.findOne("users", { username: "admin" }, {});
    user.jwt = jwt.sign({
      username: user.name,
      client: args.name,
    }, config.jwt.secret);
    user.client = args.name;
    return user;
  } catch (error) {
    throw new VError(error, `Error while signing up ${args.name}`);
  }
};

export { register };
