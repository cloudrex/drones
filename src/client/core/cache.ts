import {UniqueId} from "../../shared/account";
import {IWorldEntity} from "../../shared/entities";
import {IDisposable} from "../../shared/helpers";

export default class GameCache implements IDisposable {
    private readonly entities: Map<UniqueId, IWorldEntity>;

    public constructor() {
        this.entities = new Map();
    }

    public getEntity(id: UniqueId): IWorldEntity | null {
        return this.entities.get(id) || null;
    }

    public setEntity(id: UniqueId, entity: IWorldEntity): this {
        this.entities.set(id, entity);

        return this;
    }

    public hasEntity(id: UniqueId): boolean {
        return this.entities.has(id);
    }

    public dispose(): void {
        this.entities.clear();
    }
}