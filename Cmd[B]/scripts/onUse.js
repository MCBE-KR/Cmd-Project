import { world } from "mojang-minecraft";
import { runCommand } from "./api";
import { globalForm, globalThen } from "./form";

const ITEM_USE_MAP = new Map()
ITEM_USE_MAP.set("cmd:check_form", checkForm)

world.events.itemUse.subscribe(event => {
	const player = event.source
	const itemId = event.item.id

	if(player.id !== "minecraft:player") {
		return
	}

	const func = ITEM_USE_MAP.get(itemId)
	if(func) {
		func(player)
	}
})

function checkForm(player) {
	if(globalForm) {
		globalForm.show(player).then(globalThen)
	} else {
		runCommand(player, `tellraw @s {"rawtext": [{"translate": "form.unavailable"}]}`)
	}
}