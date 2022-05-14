import { world } from "mojang-minecraft";
import { PLAYER_MAP } from "./api";

world.events.playerJoin.subscribe(event => {
	const player = event.player
	PLAYER_MAP.set(player.name, player)
})

world.events.playerLeave.subscribe(event => {
	const playerName = event.playerName
	PLAYER_MAP.delete(playerName)
})