import { world } from "mojang-minecraft";
import { loopPlayers, runCommand } from "./api.js";
import { showStartForm } from "./form.js";
import { HashMap } from "./hashMap.js";

const PREFIX = "="

const MESSAGE = new HashMap()

const OP_MESSAGE = new HashMap()
OP_MESSAGE.set("team", selectTeam)

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

	MESSAGE.getAnd(
		message,
		(func) => func(),
		() => runCommand(sender, `tellraw @s {"rawtext": [{"text": "Failed to execute command"}]}`)
	)
})

function selectTeam() {
	loopPlayers(player => showStartForm(player))
}