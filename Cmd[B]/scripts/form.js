import { ActionFormData } from "mojang-minecraft-ui"
import { PLAYER_MAP, runWorldCommand } from "./api"

export let globalForm = null
export let globalThen = null
export function setGlobalForm(form, then) {
	globalForm = form
	globalThen = then
	
	runWorldCommand(`tellraw @a {"rawtext": [{"translate": "form.set_global"}]}`)
}

function showForm(form, players, then) {
	for(const player of players) {
		form.show(player).then(then)
	}
}

function createStartForm() {
	return new ActionFormData()
		.title("form.text.select_team")
		.button("form.text.team.blue")
		.button("form.text.team.red")
}

export function showStartForm() {
	const form = createStartForm()

	const then = (response => {
		const { isCanceled, selection } = response
		if(isCanceled) {
			return
		}

		console.warn(selection)
	})

	setGlobalForm(form, then)
	showForm(form, PLAYER_MAP.values(), then)
}