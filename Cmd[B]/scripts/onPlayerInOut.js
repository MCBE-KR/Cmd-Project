import { world } from "mojang-minecraft";
import { runWorldCommand } from "./Api";
import { canceledPlayers, nonResponsePlayers, onEmpties } from "./Form";
import { addTriableTask } from "./TickApi";

let requiresInit = true

world.events.playerJoin.subscribe(event => {
	const player = event.player

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

	let checkKeys = []
	nonResponsePlayers.forEach((players, key) => {
		if(players.indexOf(playerName) !== -1) {
			checkKeys.push(key)
		}
	})
	checkKeys.forEach(key => {
		nonResponsePlayers.reduce(key, playerName)

		if(canceledPlayers.isEmpty() && nonResponsePlayers.isEmpty()) {
			onEmpties.get(key)()
		}
	})

	checkKeys = []
	canceledPlayers.forEach((players, key) => {
		if(players.indexOf(playerName) !== -1) {
			checkKeys.push(key)
		}
	})
	checkKeys.forEach(key => {
		canceledPlayers.reduce(key, playerName)

		if(canceledPlayers.isEmpty() && nonResponsePlayers.isEmpty()) {
			onEmpties.get(key)()
		}
	})

})