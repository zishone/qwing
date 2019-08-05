import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), process.env.DOT_ENV || ".env") });

const config = {
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
  },
  bcrypt: {
    salt: + process.env.BCRYPT_SALT,
  },
  db: {
    uri: process.env.DB_URI,
  },
  graphql: {
    path: process.env.GRAPHQL_PATH,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  logger: {
    format: process.env.LOGGER_FORMAT,
  },
};

export { config };
