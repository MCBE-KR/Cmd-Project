import { world } from "mojang-minecraft";
import { PLAYER_MAP } from "./Api";
import { showStartForm } from "./Form";
import { HashMap } from "./HashMap";

const PREFIX = "="

const MESSAGE = new HashMap()

const OP_MESSAGE = new HashMap()
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
		const exists = OP_MESSAGE.getThen(message, (func) => func())
		if(exists) {
			return
		}
	}

	MESSAGE.getThen(message, (func) => func())
})

function startGame() {
	PLAYER_MAP.valuesEach(player => showStartForm(player))
}