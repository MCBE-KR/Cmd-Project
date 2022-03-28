import { EntityQueryOptions, world } from "mojang-minecraft";

const OVERWORLD = world.getDimension("overworld")

export class SaveKey {
    static LINE = "line"
}

export const SAVED = new Map()

export function getScore(player, objective) {
    const result = runCommand(player, `scoreboard players test @s ${objective} * *`)

    if (result.error) {
        return null
    } else {
        return parseInt(result.statusMessage.match(/-?\d+/)[0])
    }
}

export class ScoreChain {
    static FAILED = 0
    static SUCCESS = 1

    constructor() {
        this.status = ScoreChain.SUCCESS
        this.variableMap = new Map()
    }

    setFailed() {
        this.status = ScoreChain.FAILED
    }

    getScore(player, objective) {
        let score = getScore(player, objective)
        this.variableMap.set(objective, score)

        return this
    }

    getScoreIf(player, objective) {
        let score = getScore(player, objective)

        if(score) {
            this.variableMap.set(objective, score)
        } else {
            this.setFailed()
        }

        return this
    }

    execute(lambda) {
        if(this.status === ScoreChain.SUCCESS) {
            lambda(this.variableMap)
        }

        return this.status
    }
}

export function getScoreIf(player, objective, lambda) {
    let score = getScore(player, objective)

    if(score) {
        lambda(score)
    }
}

export function getTagPlayers(tags) {
    let options = new EntityQueryOptions()
    if(typeof tags === "string") {
        options.tags = [tags]
    } else {
        options.tags = tags
    }

    return world.getPlayers(options)
}

export function getParticle(score) {
    switch(score) {
        case 221:
            return "cmd:j2s2_damage"
        case 222:
            return "cmd:j2s2_heal"
        default:
            console.error(`Unknown Particle Type: ${score}`)
            return null
    }
}

function executeCommand(target, command) {
    try {
        return target.runCommand(command)
    } catch (error) {
        console.error(getLogString(["Error occurred while running command", `ErrorMessage: ${error.message}`, `Command: /${command}`]))
        return null
    }
}

function runCommand(player, command) {
    return executeCommand(player, command)
}

function runWorldCommand(command) {
    return executeCommand(OVERWORLD, command)
}

export function runParticle(particle, x, y, z) {
    return runWorldCommand(`particle ${particle} ${x} ${y} ${z}`)
}

export function getLogString(logs) {
    let log = ""
    console.warn(JSON.stringify(logs))
    
    for(let i = 0; i < logs.length; i++) {
        if(i != 0) {
            log += "\n    "
        }

        log += logs[i]
    }
}