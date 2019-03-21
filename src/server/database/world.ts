import {IWorldEntity} from "../../publicApi/entities";
import Db from "./database";

export default abstract class DbWorld {
    // TODO: .toArray() || null may not work
    public static async getWorldZoneEntities(zoneId: number): Promise<IWorldEntity[] | null> {
        return await Db.x.entities.find({
            zoneId
        }).toArray() || null;
    }
}
