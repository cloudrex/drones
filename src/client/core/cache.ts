import {UniqueId} from "../../publicApi/account";
import {IWorldEntity, IWorldTerrain} from "../../publicApi/entities";
import {IDisposable} from "../../publicApi/helpers";
import Assets from "./assets";

const textures: string[] = [
    "terrain/stone"
];

export default class GameCache implements IDisposable {
    private readonly entities: Map<UniqueId, IWorldEntity>;
    private readonly textures: Map<string, HTMLImageElement>;
    private readonly zones: Map<number, IWorldTerrain[]>;

    public constructor() {
        this.entities = new Map();
        this.textures = new Map();
        this.zones = new Map();
    }

    public async loadAssets(): Promise<this> {
        // Terrain
        for (let i: number = 0; i < textures.length; i++) {
            this.textures.set(textures[i], await Assets.loadImage(textures[i]));
        }

        return this;
    }

    // Zones
    public setZone(zone: number, terrain: IWorldTerrain[]): this {
        this.zones.set(zone, terrain)

        return this;
    }

    public getZone(zone: number): IWorldTerrain[] | null {
        if (this.zones.has(zone)) {
            return this.zones.get(zone) || null;
        }

        return null;
    }

    public hasZone(zone: number): boolean {
        return this.zones.has(zone);
    }

    // Textures
    public getTextures(): ReadonlyMap<string, HTMLImageElement> {
        return this.textures;
    }

    public hasTexture(texture: string): boolean {
        return this.textures.has(texture);
    }

    public getTexture(name: string): HTMLImageElement | null {
        return this.textures.get(name) || null;
    }

    // Entities
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
