import { world, EntityRaycastOptions } from "mojang-minecraft"
import * as Api from "./api.js"
import { SaveKey, ScoreChain } from "./api.js"
import { LineData } from "./object.js"
import { addTask } from "./onTick.js"

const ENTITY_CREATE = new Map()
ENTITY_CREATE.set("cmd:check_mana", checkManaXp)
ENTITY_CREATE.set("cmd:scan_hit", getHitScan)
ENTITY_CREATE.set("cmd:save_line", saveLine)
ENTITY_CREATE.set("cmd:show_particle", showParticle)

world.events.entityCreate.subscribe(event => {
    let entity = event.entity

	let func = ENTITY_CREATE.get(entity.id)
	if(func) {
		func()
	}
})

function getExecutors() {
	return Api.getTagPlayers("executor")
}

function checkManaXp() {
	let players = getExecutors()

	for(let player of players) {
		Api.getScoreIf(player, "mana", score => {
			player.runCommand(`xp -1000L @s`)
			player.runCommand(`xp ${score}L @s`)
		})
	}
}

function getHitScan() {
	let players = getExecutors()

	for(let player of players) {
		Api.getScoreIf(player, "param1", score => {
			let option = new EntityRaycastOptions()
			option.maxDistance = score
			option.closest = 1

			player.getEntitiesFromViewVector(option)[0]?.addTag("target")
		})
	}
}

function saveLine() {
	let srcList = []
	let dstList = []

	for(let player of Api.getTagPlayers("src")) {
		srcList.push(player.location)
	}

	for(let player of Api.getTagPlayers("dst")) {
		dstList.push(player.location)
	}

	let lines = []
	for (let src of srcList) {
		for(let dst of dstList) {
			lines.push(new LineData(src, dst))
		}
	}

	Api.SAVED.set(SaveKey.LINE, lines)
}

function showParticle() {
	let players = getExecutors()

	for(let player of players) {
		let result = new ScoreChain().getScoreIf(player, "param1")
			.getScoreIf(player, "param2")
			.getScoreIf(player, "param3")
			.getScoreIf(player, "param4")
			.getScoreIf(player, "param5")
			.execute((variableMap) => {
				let particleScore = variableMap.get("param1")
				let multiplier = variableMap.get("param2")
				let delayMultiplier = variableMap.get("param3")
				let particlePerDelay = variableMap.get("param4")
				let yOffset = variableMap.get("param5") / 100

				let particle = Api.getParticle(particleScore)

				for (let line of Api.SAVED.get(SaveKey.LINE)) {
					let diff = line.getDiff(multiplier)
					let increaseCount = Math.ceil(line.dist) * Math.round(100 / multiplier)
					let src = line.src

					for (let i = 0; i < increaseCount; i ++) {
						let executable = () => Api.runParticle(particle, src.x - (diff.x * i), src.y - (diff.y * i) + yOffset, src.z - (diff.z * i))
						let delay = Math.floor(i * delayMultiplier / particlePerDelay)
						console.warn(delay)

						addTask(delay, executable)
					}
				}
			})

		if(result === ScoreChain.FAILED) {
			console.warn(Api.getLogString("Method('showParticle') failed", `player: ${player.name}`))
		}
	}
}