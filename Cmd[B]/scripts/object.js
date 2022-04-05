export class CustomLocation {
	constructor(x, y, z, multiplier = 1) {
		this.x = x * multiplier / 100
		this.y = y * multiplier / 100
		this.z = z * multiplier / 100
	}

	equals(location) {
		return this.x === location.x && this.y === location.y && this.z === location.z
	}
}

export class LineData {
	constructor(src, dst) {
		this.src = src
		this.dst = dst
		
		let xDiff = src.x - dst.x
		let yDiff = src.y - dst.y
		let zDiff = src.z - dst.z

		this.dist = Math.sqrt((Math.abs(xDiff) ** 2) + (Math.abs(yDiff) ** 2) + (Math.abs(zDiff) ** 2))
		this.xDiff = (xDiff / this.dist)
		this.yDiff = (yDiff / this.dist)
		this.zDiff = (zDiff / this.dist)
	}

	getDiff(multiplier) {
		return new CustomLocation(this.xDiff, this.yDiff, this.zDiff, multiplier)
	}
}