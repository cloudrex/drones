import {UniqueId} from "../../public-api/account";
import {IWorldEntity, IWorldTerrain} from "../../public-api/entities";
import {IDisposable} from "../../public-api/helpers";

export default class GameCache implements IDisposable {
    private readonly entities: Map<UniqueId, IWorldEntity>;
    private readonly terrain: Map<UniqueId, IWorldTerrain>;

    public constructor() {
        this.entities = new Map();
        this.terrain = new Map();
    }

    public getEntities(): ReadonlyMap<UniqueId, IWorldEntity> {
        return this.entities;
    }

    public getEntity(id: UniqueId): IWorldEntity | null {
        return this.entities.get(id) || null;
    }

    public setEntity(entity: IWorldEntity): this {
        this.entities.set(entity.id, entity);

        return this;
    }

    public hasEntity(id: UniqueId): boolean {
        return this.entities.has(id);
    }

    public dispose(): void {
        this.entities.clear();
    }
}