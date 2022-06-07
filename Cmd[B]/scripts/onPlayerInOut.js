import { world } from "mojang-minecraft";
import { PLAYER_MAP, runWorldCommand } from "./Api";
import { addTriableTask } from "./OnTickApi";

let requiresInit = true

world.events.playerJoin.subscribe(event => {
	const player = event.player
	PLAYER_MAP.set(player.name, player)

	addTriableTask(10, -1, () => {
		if(requiresInit) {
			runWorldCommand("function setting/init_score")
			runWorldCommand("event entity @e cmd:despawn")
		}

		player.runCommand("scoreboard players set @s control 2")
		player.runCommand("titleraw @s times 0 1 0")
	}, false)

	requiresInit = false
})

world.events.playerLeave.subscribe(event => {
	const playerName = event.playerName
	PLAYER_MAP.delete(playerName)
})