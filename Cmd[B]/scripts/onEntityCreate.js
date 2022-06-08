import { world, EntityRaycastOptions } from "mojang-minecraft"
import * as Api from "./Api.js"
import { SaveKey, ScoreChain } from "./Api.js"
import { HashMap } from "./HashMap.js"
import { LineData } from "./Object.js"
import { addTask } from "./TickApi"

const OVERWORLD = world.getDimension("overworld")

const ENTITY_CREATE = new HashMap()
ENTITY_CREATE.set("cmd:check_mana", checkManaXp)
ENTITY_CREATE.set("cmd:scan_hit", getHitScan)
ENTITY_CREATE.set("cmd:save_line", saveLine)
ENTITY_CREATE.set("cmd:show_particle", showParticle)
ENTITY_CREATE.set("cmd:heal_slow", healSlow)
ENTITY_CREATE.set("cmd:damage_slow", damageSlow)
ENTITY_CREATE.set("cmd:add_rider", addRider)
ENTITY_CREATE.set("cmd:get_rider", getRider)
ENTITY_CREATE.set("cmd:remove_rider", removeRider)
ENTITY_CREATE.set("cmd:play_sound", playSound)
ENTITY_CREATE.set("cmd:give_buff", giveBuff)

world.events.entityCreate.subscribe(event => {
    const entity = event.entity
	const entityId = entity.id

	ENTITY_CREATE.getThen(entityId, (func) => func())
})

function parseCustomRegex(params, startIdx, endStr, concat = "_") {
	let i = startIdx
	let result = ""
	let param

	while((param = params[++i]) !== endStr) {
		if(i > 100) {
			throw new Error(Api.getLogString("Maximum loop reached in parseCustomRegex", params, startIdx, endStr, concat, result))
		}

		if(result !== "") {
			result = result + concat
		}

		result += param
	}

	return [result, i]
}

function checkTag(tag, executor) {
	const params = tag.split("_")
	let selectors = []

	let param, regexResult
	for(let i = 0; i < params.length; i++) {
		param = params[i]
		regexResult = parseCustomRegex(params, i, param)

		switch(param) {
			case "r":
			case "tag":
				selectors.push(`${param}=${regexResult[0]}`)
				break

			case "a":
				const newTag = regexResult[0]

				try {
					if(selectors.length) {
						executor.runCommand(`tag @a[${selectors}] add ${newTag}`)
						selectors = []
					} else {
						executor.runCommand(`tag @a add ${newTag}`)
					}
				} catch(ignored) {}

				break

			case "re":
				const removeTag = regexResult[0]

				try {
					if(selectors.length) {
						executor.runCommand(`tag @a[${selectors}] remove ${removeTag}`)
						selectors = []
					} else {
						executor.runCommand(`tag @a remove ${removeTag}`)
					}
				} catch(ignored) {}

				break

			case "f":
				try {
					executor.runCommand(`function ${regexResult[0]}`)
				} catch(ignored) {}
				
				break

			default:
				console.error(new Error(`Unknown param - ${param}`))
		}


		i = regexResult[1]
	}
}

function getExecutors() {
	return Api.getTagPlayers("executor")
}

function checkManaXp() {
	const players = getExecutors()

	for(const player of players) {
		Api.checkManaXp(player)
	}
}

function getHitScan() {
	const players = getExecutors()

	for(const player of players) {
		Api.getScoreIf(player, "param1", score => {
			const option = new EntityRaycastOptions()
			option.maxDistance = score
			option.closest = 1

			player.getEntitiesFromViewVector(option)[0]?.addTag("target")
		})
	}
}

function saveLine() {
	const srcList = []
	const dstList = []

	for(const player of Api.getTagPlayers("src")) {
		srcList.push(player.location)
	}

	for(const player of Api.getTagPlayers("dst")) {
		dstList.push(player.location)
	}

	const lines = []
	for(const src of srcList) {
		for(const dst of dstList) {
			lines.push(new LineData(src, dst))
		}
	}

	Api.SAVED.set(SaveKey.LINE, lines)
}

function showParticle() {
	const players = getExecutors()

	for(const player of players) {
		let func;
		if(player.hasTag("show_line")) {
			func = showLineParticle
		} else if(player.hasTag("show_target")) {
			func = showTargetParticle
		}

		if(func && func(player) === ScoreChain.FAILED) {
			console.warn(Api.getLogString("Method('showParticle') failed", `player: ${player.name}`))
		}
	}
}

function showLineParticle(player) {
	return new ScoreChain().getParamsIf(player, 5, variableMap => {
		const particleScore = variableMap.get("param1")
		const multiplier = variableMap.get("param2")
		const delayMultiplier = variableMap.get("param3")
		const particlePerDelay = variableMap.get("param4")
		const yOffset = variableMap.get("param5") / 100

		const particle = Api.getParticle(particleScore)

		for(const line of Api.SAVED.get(SaveKey.LINE)) {
			const diff = line.getDiff(multiplier)
			const increaseCount = Math.ceil(line.dist) * Math.round(100 / multiplier)
			const src = line.src

			for(let i = 0; i < increaseCount; i++) {
				const task = () => Api.runParticle(particle, src.x - (diff.x * i), src.y - (diff.y * i) + yOffset, src.z - (diff.z * i))
				const delay = Math.floor(i * delayMultiplier / particlePerDelay)

				addTask(delay, task)
			}
		}
	})
}

function showTargetParticle(player) {
	return new ScoreChain().getParamsIf(player, 5, variableMap => {
		const targets = Api.getTagPlayers("target")

		const particleScore = variableMap.get("param1")
		const endParticleScore = variableMap.get("param2")
		const duration = variableMap.get("param3")
		const rate = variableMap.get("param4")
		const yOffSet = variableMap.get("param5") / 100

		const particle = Api.getParticle(particleScore)
		const endParticle = Api.getParticle(endParticleScore)

		let i = 0;
		let delay;
		while ((delay = i++ * rate) < duration) {
			for(const target of targets) {
				const task = () => Api.runParticle(particle, target.location.x, target.location.y + yOffSet, target.location.z)
				addTask(delay, task)
			}
		}

		if (endParticle) {
			for(const target of targets) {
				const task = () => Api.runParticle(endParticle, target.location.x, target.location.y + yOffSet, target.location.z)
				addTask(delay, task)
			}
		}
	})
}

function healSlow() {
	const healers = Api.getTagPlayers("healer")
	let targets = Api.getTagPlayers("target")

	for(const healer of healers) {
		const tags = healer.getTags()
			.filter(tag => tag.startsWith("tag_"))
			.map(tag => tag.substring(4))

		new ScoreChain().getParamsIf(healer, 5, variableMap => {
			const heal = variableMap.get("param1")
			const duration = variableMap.get("param2")
			const rate = variableMap.get("param3")
			const downPercent = (100 - variableMap.get("param4")) / 100
			const down = variableMap.get("param5")

			let i = 0;
			let delay;
			let lastHeal = undefined;
			while ((delay = i++ * rate) < duration) {
				let task
				const innerTask = () => {
					if(lastHeal) {
						lastHeal = Math.max(0, Math.floor(lastHeal * downPercent - down))
					} else {
						lastHeal = heal
					}

					Api.setScore(healer, "param1", lastHeal)

					healer.addTag("healer")
					for(const target of targets) {
						target.addTag("target")
					}

					Api.runFunction(healer, "damage/heal")

					healer.removeTag("healer")
					for(const target of targets) {
						target.removeTag("target")
					}
				}

				if(!tags.length) {
					task = () => innerTask()
				} else {
					task = () => {
						for(const tag of tags) {
							checkTag(tag, healer)
							targets = Api.getTagPlayers("target")

							innerTask()
						}
					}
				}

				addTask(delay + 1, task)
			}
		})
	}
}

function damageSlow() {
	const attackers = Api.getTagPlayers("attacker")
	let victims = Api.getTagPlayers("victim")

	for (const attacker of attackers) {
		const tags = attacker.getTags()
			.filter(tag => tag.startsWith("tag_"))
			.map(tag => tag.substring(4))

		new ScoreChain().getParamsIf(attacker, 5, variableMap => {
			const damage = variableMap.get("param1")
			const duration = variableMap.get("param2")
			const rate = variableMap.get("param3")
			const downPercent = (100 - variableMap.get("param4")) / 100
			const down = variableMap.get("param5")

			let i = 0;
			let delay;
			let lastDamage = undefined;
			while ((delay = i++ * rate) < duration) {
				let task
				const innerTask = () => {
					if(lastDamage) {
						lastDamage = Math.max(0, Math.floor(lastDamage * downPercent - down))
					} else {
						lastDamage = damage
					}

					Api.setScore(attacker, "param1", lastDamage)

					attacker.addTag("attacker")
					for(const victim of victims) {
						victim.addTag("victim")
					}

					Api.runFunction(attacker, "damage/damage")

					attacker.removeTag("attacker")
					for (const victim of victims) {
						victim.removeTag("victim")
					}
				}

				if (!tags.length) {
					task = () => innerTask()
				} else {
					task = () => {
						for(const tag of tags) {
							checkTag(tag, attacker)
							victims = Api.getTagPlayers("victim")

							innerTask()
						}
					}
				}

				addTask(delay + 1, task)
			}
		})
	}
}

function addRider() {
	const players = getExecutors()

	for(const player of players) {
		player.getTags()
			.filter(tag => tag.startsWith("rider_"))
			.forEach(tag => {
				const identifier = `cmd:${tag.substring(6)}`
				const rider = OVERWORLD.spawnEntity(identifier, player.location)

				Api.runCommand(player, `ride @e[type=${identifier}, tag=!rider] start_riding @s teleport_rider`)
				rider.addTag("rider")

				Api.RIDER.push(player.name, rider)
			})
	}
}

function getRider() {
	const players = getExecutors()

	for(const player of players) {
		const riderList = Api.RIDER.getOrReturn(player.name, () => [])
		
		player.getTags()
			.filter(tag => tag.startsWith("rider_"))
			.map(tag => player.removeTag(tag))
			.forEach(tag => {
				const identifier = `cmd:${tag.substring(6)}`
			
				riderList.filter(rider => rider.id === identifier)
					.forEach(rider => rider.addTag("target"))
			})
	}
}

function removeRider() {
	const players = getExecutors()

	for(const player of players) {
		const riderList = Api.RIDER.getOrReturn(player.name, () => [])
		const identifiers = player.getTags()
			.filter(tag => tag.startsWith("rider_"))
			.map(tag => {
				player.removeTag(tag)
				return `cmd:${tag.substring(6)}`
			})

		Api.removeAll(riderList, identifiers, rider => rider.id)
			.forEach(removedRider => {
				const identifier = removedRider.id
				const despawnTime = Api.DESPAWN_TICK.getOrReturn(identifier, () => 0)

				addTask(despawnTime, () => Api.runWorldCommand(`event entity @e[type=${identifier}] cmd:despawn`))

				if(despawnTime !== 0) {
					Api.runCommand(removedRider, `playanimation @e[type=${identifier}] despawn`)
				}
			})
	}
}

const DEFAULT_SOUND_RANGE = 20

function playSound() {
	const players = getExecutors()

	for(const player of players) {
		new ScoreChain().getParamsIf(player, 5, variableMap => {
			const soundScore = variableMap.get("param1")
			const duration = variableMap.get("param2")
			const rate = variableMap.get("param3")
			let range = variableMap.get("param4")
			const pitch = variableMap.get("param5") / 100

			if (range === 0) {
				range = DEFAULT_SOUND_RANGE
			}

			const sound = Api.getSound(soundScore)

			let i = 0;
			let delay;
			while ((delay = i++ * rate) < duration) {
				const task = () => Api.runPlaySound(player, sound, range, pitch)
				addTask(delay, task)
			}
		})
	}
}

function giveBuff() {
	const players = getExecutors()
	let targets = Api.getTagPlayers("target")

	for(const player of players) {
		const tags = player.getTags()
			.filter(tag => tag.startsWith("tag_"))
			.map(tag => tag.substring(4))

		new ScoreChain().getParamsIf(player, 4, variableMap => {
			const duration = variableMap.get("param1")
			const rate = variableMap.get("param2")
			const amplifier = variableMap.get("param3")
			const hideParticle = variableMap.get("param4") === 1

			const effects = player.getTags()
				.filter(tag => tag.startsWith("effect_"))
				.map(tag => tag.substring(7))

			const increase = rate * 20
			for(let i = 0; i < duration * 20; i += increase) {
				for(const effect of effects) {
					const command = Api.getEffectCommand(effect, rate, amplifier, hideParticle)
					let task

					if (!tags.length) {
						for(const target of targets) {
							task = () => Api.runCommand(target, command)
						}
					} else {
						task = () => {
							for(const tag of tags) {
								checkTag(tag, player)
								targets = Api.getTagPlayers("target")

								for(const target of targets) {
									Api.runCommand(target, command)
									target.removeTag("target")
								}
							}
						}
					}

					addTask(i, task)
				}
			}
		})
	}
}