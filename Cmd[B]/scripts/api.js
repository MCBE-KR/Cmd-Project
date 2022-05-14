import { EntityQueryOptions, world } from "mojang-minecraft";

const OVERWORLD = world.getDimension("overworld")

export class SaveKey {
    static LINE = "line"
}

export const PLAYER_MAP = new Map()
export const SAVED = new Map()
export const RIDER = new Map()

export const DESPAWN_TICK = new Map()
DESPAWN_TICK.set("cmd:shield", 10)

class EffectData {
    constructor(name, des, lvName) {
        this.name = name
        this.des = des
        this.lvName = lvName
    }
}

function addEffect(list, name, des, hasLv) {
    const lvName = hasLv ? name + "Lv" : null
    list.push(new EffectData(name, des, lvName))
}

export const DEBUFF_LIST = []
addEffect(DEBUFF_LIST, "stun", "기절", false)
addEffect(DEBUFF_LIST, "silence", "침묵", false)
addEffect(DEBUFF_LIST, "heal_reduce", "치유 감소", true)
addEffect(DEBUFF_LIST, "fire", "화염", true)
addEffect(DEBUFF_LIST, "poison", "독", true)

export const BUFF_LIST = []
addEffect(BUFF_LIST, "invincible", "무적", false)
addEffect(BUFF_LIST, "invisible", "투명화", false)
addEffect(BUFF_LIST, "cc_resist", "CC 저항", true)

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

        if(score || score === 0) {
            this.variableMap.set(objective, score)
        } else {
            this.setFailed()
            runWorldCommand(`say Failed - ${objective}`)
        }

        return this
    }

    execute(lambda) {
        if(this.status === ScoreChain.SUCCESS) {
            lambda(this.variableMap)
        }

        return this.status
    }

    getParamsIf(player, maxParamIndex, lambda) {
        for (let i = 1; i <= maxParamIndex; i++) {
            this.getScoreIf(player, `param${i}`)
        }

        this.execute(lambda)
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
        case 0:
            return null
        case 221:
            return "cmd:j2s2_damage"
        case 222:
            return "cmd:j2s2_heal"
        case 231:
            return "cmd:j2s3"
        case 232:
            return "cmd:j2s3_circle"
        case 241:
            return "cmd:j2s4_buff"
        case 242:
            return "cmd:j2s4_end"
        case 243:
            return "cmd:j2s4_walk"
        default:
            console.error(`Unknown Particle Type: ${score}`)
            return null
    }
}

export function getSound(score) {
    switch (score) {
        case 0:
            return null
        case 232:
            return "cmd.j2s3_sec"
        default:
            console.error(`Unknown Sound Type: ${score}`)
            return null
    }
}

function executeCommand(target, command) {
    try {
        return target.runCommand(command)
    } catch (error) {
        console.error(getLogString(["Error occurred while running command", `Error: ${error}`, `Player: ${target?.name}`, `Command: /${command}`]))
        return null
    }
}

export function runCommand(player, command) {
    return executeCommand(player, command)
}

export function runWorldCommand(command) {
    return executeCommand(OVERWORLD, command)
}

export function runParticle(particle, x, y, z) {
    return runWorldCommand(`particle ${particle} ${x} ${y} ${z}`)
}

export function runFunction(player, functionName) {
    return runCommand(player, `function ${functionName}`)
}

export function runPlaySound(player, sound, range, pitch) {
    return runCommand(player, `playsound ${sound} @a[r=${range}] ~ ~ ~ 1.0 ${pitch}`)
}

export function setScore(player, scoreboard, score) {
    return runCommand(player, `scoreboard players set @s ${scoreboard} ${score}`)
}

export function getEffectCommand(effect, rate, amplifier, hideParticle) {
    return `effect @s ${effect} ${rate} ${amplifier} ${hideParticle}`
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

export function remove(arr, value, func) {
    let index;
    if (func) {
        const newArr = arr.map(v => func(v))
        index = newArr.indexOf(func(value))
    } else {
        index = arr.indexOf(value)
    }

    if (index !== -1) {
        arr.splice(index, 1)
    }
}

export function removeAll(arr, values, func) {
    const newArr = func ? arr.map(v => func(v)) : arr
    const indexList = []
    const removedList = []

    for (const value of values) {
        const index = newArr.indexOf(value)

        if (index !== -1) {
            if (func) {
                indexList.push(index)
            } else {
                removedList.push(newArr[index])
            }
            
            newArr.splice(index, 1)
        }
    }

    if (func) {
        for (const index of indexList) {
            removedList.push(arr[index])
            arr.splice(index, 1)
        }
    }

    return removedList
}