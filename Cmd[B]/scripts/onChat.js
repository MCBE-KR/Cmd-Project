import { world } from "mojang-minecraft";
import { runWorldCommand } from "./api";
import { isStarted, setIsStarted } from "./game";

const PREFIX = "="

const MESSAGE = new Map()

const OP_MESSAGE = new Map()
OP_MESSAGE.set("start", startGame)

world.events.beforeChat.subscribe(event => {
	const sender = event.sender
	const eventMessage = event.message

	const isOp = sender.hasTag("op")

	if (!eventMessage.startsWith(PREFIX)) {
		return
	}

	event.cancel = true
	const message = eventMessage.substring(PREFIX.length)
	
	if(isOp) {
		const func = OP_MESSAGE.get(message)
		
		if(func) {
			func()
			return
		}
	}

	const func = MESSAGE.get(message)
	if(func) {
		func()
	}
})

function startGame() {
	setIsStarted(true)
	runWorldCommand("say Start!")
}