import GameCache from "./cache";
import {IAuthCredentials, UniqueId} from "../../shared/account";
import {Events} from "../../public-api/events";

export default class GameNetwork {
    private readonly cache: GameCache;
    private readonly socket: SocketIOClient.Socket;

    public constructor(cache: GameCache) {
        this.cache = cache;
        this.socket = io();
    }

    public init(): this {
        // Setup events
        this.socket.on(Events.AuthenticateFailed, () => {
            alert("auth failed");
        });

        this.socket.on(Events.Authenticate, (id: UniqueId) => {
            console.log(`Authenticated @ ${id}`)
        });

        return this;
    }

    public authenticate(credentials: IAuthCredentials): this {
        this.socket.emit(Events.Authenticate, credentials);

        return this;
    }
}