import {
  CollectionInsertOneOptions,
  Db,
  FindOneOptions,
  InsertOneWriteOpResult,
  MongoClient,
  ObjectId,
} from "mongodb";
import { VError } from "verror";

import { config } from "../../config/config";

class MongoDbHelper {
  private conn: MongoClient;
  private dbName: string;

  public async find(collection: string, query: object, options: FindOneOptions): Promise<any[]> {
    try {
      const db = await this.getDbConn();
      return await db
        .collection(collection)
        .find(query, options)
        .toArray();
    } catch (error) {
      throw new VError(error, `Error while fetching documents from ${collection}`);
    }
  }

  public async findOne(collection: string, query: object, options: FindOneOptions): Promise<any> {
    try {
      const db = await this.getDbConn();
      return await db
        .collection(collection)
        .findOne(query, options);
    } catch (error) {
      throw new VError(error, `Error while fetching one document from ${collection}`);
    }
  }

  public async insertOne(collection: string, document: object, options: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult> {
    try {
      const db = await this.getDbConn();
      return await db
        .collection(collection)
        .insertOne(document, options);
    } catch (error) {
      throw new VError(error, `Error while inserting one document to ${collection}`);
    }
  }

  public setDb(dbName: string) {
    this.dbName = dbName;
  }

  private async getDbConn(): Promise<Db> {
    try {
      if (!this.conn || !this.conn.isConnected()) {
        this.conn = await MongoClient.connect(config.db.uri, { useNewUrlParser: true });
        console.log(`Successfully connected to ${config.db.uri}`);
      }
      return this.conn
        .db(this.dbName);
    } catch (error) {
      throw new VError(error, `Error while connecting to ${config.db.uri}/${this.dbName}`);
    }
  }
}

const mongo = new MongoDbHelper();
export { mongo, ObjectId };
