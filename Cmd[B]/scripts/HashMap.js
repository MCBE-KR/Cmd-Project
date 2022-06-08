import { world } from "mojang-minecraft"

export class HashMap extends Map {
	static KEY_CALLBACK = (key) => String(key)
	static VALUE_CALLBACK = (value) => String(value)

	/**
	 * @returns key에 상응하는 값, 만약 존재하지 않는다면 callback의 결과값을 key로 set하고 리턴
	*/
	getOrSet(key, callback) {
		let result = this.get(key)

		if (!result) {
			result = callback()
			this.set(key, result)
		}

		return result
	}

	/**
	 * @param callback key에 상응하는 값이 존재할 시, 해당 값을 인자로 받고 실행하는 함수
	 * @returns key에 상응하는 값
	 */
	getThen(key, callback) {
		const result = this.get(key)
		if (result) {
			callback(result)
		}

		return result
	}

	/**
	 * @param callback key에 상응하는 값이 존재하지 않을 시, 실행하는 함수
	 * @returns key에 상응하는 값
	 */
	getOr(key, callback) {
		const result = this.get(key)
		if (!result) {
			callback()
		}

		return result
	}

	/**
	 * @returns key에 상응하는 값, 만약 존재하지 않는다면 callback의 결과값을 리턴
	 */
	getOrReturn(key, callback) {
		const result = this.get(key)
		if (!result) {
			return callback()
		}

		return result
	}

	/**
	 * @param then key에 상응하는 값이 존재할 시, 해당 값을 인자로 받고 실행하는 함수
	 * @param or key에 상응하는 값이 존재하지 않을 시, 실행하는 함수
	 * @returns key에 상응하는 값
	 */
	getAnd(key, then, or) {
		const result = this.get(key)

		if (result) {
			then(result)
		} else {
			or()
		}

		world.getPlayers
		return result
	}

	/**
	 * @param value key에 상응하는 배열이 존재할 시 Set에 추가하고, 존재하지 않을 시 배열을 생성하여 key로 저장하고 배열에 추가
	 * @see Set
	 */
	push(key, value) {
		const result = this.get(key) || new Set()
		if(!result.length) {
			this.set(key, result)
		}

		result.add(value)
		return result 
	}

	/**
	 * @param value key에 상응하는 배열에서 제거할 객체
	 */
	reduce(key, value) {
		const result = this.get(key)
		if(!result) {
			return
		}

		const index = result.indexOf(value)
		if(index !== -1) {
			if(result.length === 1) {
				this.delete(key)
			} else {
				result.splice(index, 1)
			}
		}
	}

	contains(key) {
		return this.get(key) !== null
	}

	isEmpty() {
		return this.size === 0
	}

	/**
	 * @param callback 각각의 value를 인자로 받아 실행하는 함수
	 */
	valuesEach(callback) {
		for(const value of this.values()) {
			callback(value)
		}
	}

	/**
	 * @param callback 각각의 key를 인자로 받아 실행하는 함수
	 */
	keysEach(callback) {
		for(const key of this.keys()) {
			callback(key)
		}
	}

	toObject(
		keyCallback = HashMap.KEY_CALLBACK,
		valueCallback = HashMap.VALUE_CALLBACK
	) {
		const output = {}
		this.forEach((value, key) => {
			if (value instanceof HashMap) {
				output[keyCallback(key)] = value.toString(keyCallback, valueCallback)
			} else {
				output[keyCallback(key)] = valueCallback(value)
			}
		})

		return output
	}

	toString(
		keyCallback = HashMap.KEY_CALLBACK,
		valueCallback = HashMap.VALUE_CALLBACK
	) {
		const object = this.toObject(keyCallback, valueCallback);
		if (object === {}) {
			return "{}"
		}

		return JSON.stringify(object).replace(/\\\\r\\\\n/gi, "").replace(/\\"/gi, "\"")
	}

	static parse(object) {
		const output = new HashMap()

		for (const key of Object.keys(object)) {
			let value = object[key]

			if (value instanceof Object) {
				value = HashMap.parse(value)
			} else if (value instanceof Array) {
				const arr = []
				for (const v of value) {
					arr.push(HashMap.parse(v))
				}
			}

			output.set(key, value)
		}

		return output
	}
}