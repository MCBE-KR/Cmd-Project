import { world } from "mojang-minecraft"
import { PLAYER_MAP, runFunction, runWorldCommand, ScoreChain } from "./api"
import { isStarted } from "./game"

const queue = new Map()
const triableQueue = new Map()

let currentTick = 0

class TriableTask {
	constructor(tryRate, maxTryCount, task) {
		this.tryRate = tryRate
		this.tryCount = 0
		this.maxTryCount = maxTryCount
		this.task = task
	}

	run() {
		try {
			this.tryCount++
			this.task()
		} catch(e) {
			return false
		}

		return true
	}
}

export function addTask(delay, task) {
	if(delay === 0) {
		task()
		return
	}

	const tick = currentTick + delay
	const taskList = queue.get(tick) || []

	taskList.push(task)
	queue.set(tick, taskList)
}

export function addTriableTask(tryRate, maxTryCount, task, runImmediately) {
	if(tryRate < 1) {
		throw new Error("Repeat rate cannot be less than 1")
	}

	const repeatableTask = new TriableTask(tryRate, maxTryCount, task)
	if(runImmediately && repeatableTask.run()) {
		return
	}

	addFailedTriableTask(repeatableTask)
}

export function addFailedTriableTask(triableTask) {
	if(triableTask.tryCount === triableTask.maxTryCount) {
		return
	}

	const tick = currentTick + triableTask.tryRate
	const taskList = triableQueue.get(tick) || []

	taskList.push(triableTask)
	triableQueue.set(tick, taskList)
}

function checkEffects(players) {
	for(const player of players) {
		new ScoreChain()
			.getScore(player, "airbon")
			.getScore(player, "stun")
			.getScore(player, "silence")
	}
}

world.events.tick.subscribe(() => {
	currentTick++

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

	if (!isStarted) {
		return
	}

	const players = PLAYER_MAP.values()

	runWorldCommand(`function event/on_global_tick`)
	checkEffects(players)

	for(const player of players) {
		runFunction(player, "event/on_tick")

		if(currentTick % 20 === 0) {
			runFunction(player, "event/on_sec")
		}
	}
})