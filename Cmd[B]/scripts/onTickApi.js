export const queue = new Map()
export const triableQueue = new Map()

export let currentTick = 0

export function increaseTick() {
	currentTick++
}

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