import { ActionFormData } from "mojang-minecraft-ui"
import { runCommand } from "./Api"
import { HashMap } from "./HashMap"

const TITLE = {
	SELECT_TEAM: "form.title.select_team"
}

export const canceledPlayers = new HashMap()
export const nonResponsePlayers = new HashMap()
export const forms = new HashMap()
export const thens = new HashMap()

let currentPlayer = null
export function setCurrentPlayer(player) {
	currentPlayer = player
}

function setCanceled(title, player) {
	nonResponsePlayers.reduce(title, player)
	canceledPlayers.push(title, player)
}

function setAnswered(title, player) {
	canceledPlayers.reduce(title, player)
	nonResponsePlayers.reduce(title, player)
}

export function showForm(title, player) {
	if(forms.size === 0) {
		initForm()
	}

	forms.get(title)
		.show(player)
		.then(thens.get(title))
}

export function showStartForm(player) {
	nonResponsePlayers.push(TITLE.SELECT_TEAM, player)
	showForm(TITLE.SELECT_TEAM, player)
}

export function showReadyForm(player) {
	
}

export function initForm() {
	let title = TITLE.SELECT_TEAM;
	forms.set(title, new ActionFormData()
		.title(title)
		.button("form.text.team.blue")
		.button("form.text.team.red")
	)
	thens.set(title, (response) => {
		const { isCanceled, selection } = response
		if(isCanceled) {
			setCanceled(title, currentPlayer)
			console.warn(canceledPlayers.get(title)?.length + " " + nonResponsePlayers.get(title)?.length)
			return
		}

		setAnswered(title, currentPlayer)
		runCommand(currentPlayer, `scoreboard players set @s team ${selection + 1}`)
		showReadyForm(currentPlayer)
	})
}