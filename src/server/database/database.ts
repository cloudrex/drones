import Mongo from "mongodb";

export type IDbCollections = {
    readonly entities: Mongo.Collection;
}

export default abstract class Db {
    public static source: Mongo.Db;
    public static x: IDbCollections;

    public static async setup(): Promise<void> {
        //
    }
}