export class CustomLocation {
	constructor(x, y, z, multiplier = 1) {
		this.x = x * multiplier
		this.y = y * multiplier
		this.z = z * multiplier
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

		this.totalDiff = Math.abs(xDiff) + Math.abs(yDiff) + Math.abs(zDiff)
		this.xDiff = (xDiff * (xDiff / this.totalDiff)) / 100
		this.yDiff = (yDiff * (yDiff / this.totalDiff)) / 100
		this.zDiff = (zDiff * (zDiff / this.totalDiff)) / 100
	}

	getDiff(multiplier) {
		return new CustomLocation(this.xDiff, this.yDiff, this.zDiff, multiplier)
	}
}