import { world } from "mojang-minecraft"

const queue = new Map()
let currentTick = 0

export function addTask(delay, task) {
	if(delay === 0) {
		task()
	}

	let tick = currentTick + delay

	let taskList = queue.get(tick)
	if(!taskList) {
		taskList = []
	}

	taskList.push(task)
	queue.set(tick, taskList)
}

world.events.tick.subscribe(() => {
	currentTick++

	let taskList = queue.get(currentTick)
	if(taskList instanceof Array) {
		for(let task of taskList) {
			task()
		}
	}
})