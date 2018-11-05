import {UniqueId} from "../../public-api/account";
import {IWorldEntity, IWorldTerrain} from "../../public-api/entities";
import {IDisposable} from "../../public-api/helpers";
import Assets from "./assets";

const textures: string[] = [
    "terrain/stone"
];

export default class GameCache implements IDisposable {
    private readonly entities: Map<UniqueId, IWorldEntity>;
    private readonly terrain: Map<UniqueId, IWorldTerrain>;
    private readonly textures: Map<string, HTMLImageElement>;

    public constructor() {
        this.entities = new Map();
        this.terrain = new Map();
        this.textures = new Map();
    }

    public async loadAssets(): Promise<this> {
        // Terrain
        for (let i: number = 0; i < textures.length; i++) {
            this.textures.set(textures[i], await Assets.loadImage(textures[i]));
        }

        return this;
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
    
    // Terrain
    public getTerrains(): ReadonlyMap<UniqueId, IWorldTerrain> {
        return this.terrain;
    }

    public setTerrain(terrain: IWorldTerrain): this {
        this.terrain.set(terrain.id, terrain);

        return this;
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