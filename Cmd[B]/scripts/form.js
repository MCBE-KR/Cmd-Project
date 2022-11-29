import { ActionFormData } from "mojang-minecraft-ui"
import { findPlayer, getScore, getTagPlayers, loopPlayers, runCommand } from "./api.js"
import { HashMap } from "./hashMap.js"

const TITLE = {
	SELECT_TEAM: "form.title.select_team",
}

export const canceledPlayers = new HashMap()
export const nonResponsePlayers = new HashMap()
export const forms = new HashMap()
export const onEmpties = new HashMap()
export const thens = new HashMap()

let currentPlayerName = null
export function setCurrentPlayerName(playerName) {
	currentPlayerName = playerName
}

function setCanceled(title, playerName) {
	nonResponsePlayers.reduce(title, playerName)
	canceledPlayers.push(title, playerName)
}

function setAnswered(title, playerName) {
	canceledPlayers.reduce(title, playerName)
	nonResponsePlayers.reduce(title, playerName)
}

function initForm() {
	let title = TITLE.SELECT_TEAM;
	forms.set(title, new ActionFormData()
		.title(title)
		.button("form.text.team1")
		.button("form.text.team2")
	)
	onEmpties.set(title, () => {
		const rawtext = [{"translate": "title.select_team.result"}, {"text": "\n"}, {"translate": "title.select_team.check"}]
		const teamResultMap = new HashMap()

		loopPlayers((player) => {
			const team = getScore(player, "team")
			teamResultMap.push(team, player)

			if(!player.hasTag("op")) {
				runCommand(player, `tellraw @s {"rawtext": [{"translate": "title.select_team.wait"}]}`)
			}
		})

		teamResultMap.forEach((players, team) => {
			rawtext.push({"text": "\n\n---"}, {"translate": `form.text.team${team}`}, {"text": "§r---"})
			players.forEach(player => rawtext.push({"text": `\n- ${player.name}`}))
		})

		for(const opPlayer of getTagPlayers("op")) {
			runCommand(opPlayer, `tellraw @s ${JSON.stringify({"rawtext": rawtext})}`)
		}
	})
	thens.set(title, (response) => {
		const { isCanceled, selection } = response
		const currentPlayer = findPlayer(currentPlayerName)

		if (isCanceled) {
			setCanceled(title, currentPlayerName)
			return
		}

		setAnswered(title, currentPlayerName)
		runCommand(currentPlayer, `scoreboard players set @s team ${selection + 1}`)

		if(canceledPlayers.isEmpty() && nonResponsePlayers.isEmpty()) {
			onEmpties.get(title)()
		} else {
			runCommand(currentPlayerName, `tellraw @s {"rawtext": [{"translate": "waiting"}]}`)
		}
	})
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
	console.warn(nonResponsePlayers.toString())
	nonResponsePlayers.push(TITLE.SELECT_TEAM, player.name)
	console.warn(nonResponsePlayers.toString())
	showForm(TITLE.SELECT_TEAM, player)
}