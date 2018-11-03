export enum Events {
    // Socket.IO Native
    Connection = "connection",
    Disconnect = "disconnect",

    // General
    BadRequest = "bad-request",

    // Account
    Authenticate = "authenticate",
    AuthenticateFailed = "authenticate-failed",
    NotAuthorized = "not-authorized",

    // Game -> World
    GetActiveWorldZone = "get-active-world-zone",
    
    // Game -> Entities
    MoveEntity = "move-entity",
    StopEntity = "stop-entity",
    SpawnEntity = "spawn-entity"
}