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
		
		let xDiff = dst.x - src.x
		let yDiff = dst.y - src.y
		let zDiff = dst.z - src.z

		this.totalDiff = Math.abs(xDiff) + Math.abs(yDiff) + Math.abs(zDiff)

		//1회 이동 당 비율
		this.xDiff = xDiff / this.totalDiff
		this.yDiff = yDiff / this.totalDiff
		this.zDiff = zDiff / this.totalDiff
	}

	getDiff(multiplier) {
		return new CustomLocation(this.xDiff, this.yDiff, this.zDiff, multiplier)
	}
}