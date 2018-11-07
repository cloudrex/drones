#### Automata

Automata is a strategy multiplayer programming game.

It's similar to Screeps in concept, but complerely different in implementation (not based from anything).

This is the expected gameplay of the game once playable:

1. Issue tasks to your units by code.
2. Program your units to automatically respond to different situations.
3. If you program them good enough, they would be able to efficiently obtain minerals, raid other players, etc. by themselves (while you're offline).

## Connection protocol

Nerd alert! Below is the initial protocol that all connections follow.

Legend:

**C>S** => Client to server

**S>C** => Server to client

**1. Establishing connection**

1. **C>S** SocketIO connect
2. **C>S** Authentication
3. **S>C** Authentication response
4. **S>C** Spawn initial drone
5. **C>S** Request initial zone map
6. **S>C** Initial zone map