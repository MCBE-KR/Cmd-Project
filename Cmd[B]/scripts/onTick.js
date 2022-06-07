import { world } from "mojang-minecraft"
import { BUFF_DES, BUFF_LIST, checkManaXp, getScore, PLAYER_MAP, runFunction, ScoreChain, setScore } from "./Api"
import { canceledPlayers, forms, nonResponsePlayers, setCurrentPlayer, showForm } from "./Form"
import { isStarted } from "./Game"
import { queue, triableQueue, currentTick, addFailedTriableTask, increaseTick } from "./OnTickApi"

const OVERWORLD = world.getDimension("overworld")

function checkBuff(player) {
	const titles = []

	for(const effectData of BUFF_LIST) {
		const { scoreboard, lvScoreboard, isDebuff } = effectData
		const score = getScore(player, scoreboard) || 0

		if(score > 0) {
			let lvScore
			if(lvScoreboard) {
				lvScore = getScore(player, lvScoreboard) || 0
			}

			//버프별 틱 함수(없을 수도 있음 ex: 침묵)
			let funcName
			if(isDebuff) {
				funcName = `debuff/${scoreboard}`
			} else {
				funcName = `buff/${scoreboard}`
			}

			try {
				player.runCommand(`function ${funcName}`)
			} catch(ignored) {}

			//버프 액션바 메세지 (최대 8개) (2 틱 마다)
			if(currentTick % 2 === 0) {
				return
			}

			if(titles.length < 8) {
				const des = BUFF_DES.get(scoreboard)

				let suffix = `§l${score / 20}§r§fs`
				suffix = " - " + " ".repeat(Math.max(0, 10 - suffix.length)) + suffix

				if(lvScore) {
					titles.push(`§l${des} §r§f[ §l${lvScore}§r§f ]${suffix}`)
				} else {
					titles.push(`§l${des}§r§f${suffix}`)
				}
			}
		}
	}

	if(titles.length) {
		player.runCommand(`title @s actionbar ${titles.join("\n")}`)
	} else {
		player.runCommand(`title @s actionbar §f`)
	}
}

function reduceCool(player) {
	//최적화를 위해 getScoreIf 는 반복문을 사용하지 않는다
	new ScoreChain()
		.getScoreIf(player, "cool1")
		.getScoreIf(player, "cool2")
		.getScoreIf(player, "cool3")
		.getScoreIf(player, "cool4")
		.execute((variableMap) => {
			for(let i = 1; i <= 4; i++) {
				const scoreboard = `cool${i}`
				const score = Number(variableMap.get(scoreboard))

				if(score > 0) {
					if(score === 1) {
						player.runCommand(`tellraw @s {"rawtext": [{"translate": "skill.on", "with": {"rawtext": [{"text": "${i}"}]}}]}`)
					}

					setScore(player, scoreboard, score - 1)
				}
			}
		})
}

function onPlayerTick() {
	PLAYER_MAP.valuesEach(player => {
		const shield = getScore(player, "shield") || 0
		if(shield > 0) {
			player.runCommand("function buff/shield")
		}

		checkBuff(player)
		reduceCool(player)
	})
}

function regenStat() {
	PLAYER_MAP.valuesEach(player => {
		player.runCommand(`scoreboard players operation @s hp += @s hp_regen`)
		player.runCommand(`scoreboard players operation @s mana += @s mana_regen`)
		runFunction(player, "setting/revalidate_stat")
		checkManaXp(player)
	})
}

function reduceProjectileLife() {
	try {
		OVERWORLD.runCommand("scoreboard players add @e[tag=inited, family=projectile] projectile_life -1")
		OVERWORLD.runCommand("event entity @e[family=projectile, scores={projectile_life=..0}] cmd:despawn")
	} catch(ignored) {}
}

world.events.tick.subscribe(() => {
	increaseTick()

	let taskList = queue.get(currentTick)
	if(taskList instanceof Array) {
		taskList.forEach(task => task())
	}

	queue.delete(currentTick)

	let failedList = []
	taskList = triableQueue.get(currentTick)

	if(taskList instanceof Array) {
		taskList.forEach(triableTask => {
			if(!triableTask.run()) {
				failedList.push(triableTask)
			}
		})
	}

	triableQueue.delete(currentTick)
	failedList.forEach(triableTask => addFailedTriableTask(triableTask))

	if(currentTick % 10 === 0) {
		canceledPlayers.forEach((players, title) => {
			for(const player of players) {
				setCurrentPlayer(player)
				showForm(title, player)
			}
		})

		nonResponsePlayers.forEach((players, title) => {
			for(const player of players) {
				setCurrentPlayer(player)
				showForm(title, player)
			}
		})
	}

	if (!isStarted) {
		return
	}

	reduceProjectileLife()
	onPlayerTick()

	if(currentTick % 20 === 0) {
		regenStat()
	}
})