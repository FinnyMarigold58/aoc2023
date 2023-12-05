// Define structures
type gridLocation = {
	x: number
	y: number
	symbol?: string
	numbers?: number[]
}

import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const filename = "input.txt"

const symbolRegex = /[^.\d\s]/g
const numberRegex = /\d+/g

const squareTranslations: Array<gridLocation> = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 }
]

const data = readFileSync(`${__dirname}/${filename}`, "utf-8")

let sum = 0

const symbolMap: Array<gridLocation> = []

const lines = data.split("\r\n")
for (const lineN in lines) {
	const line = lines[parseInt(lineN)]
	for (let charN = 0; charN < line.length; charN++) {
		const char = line[charN]
		if (symbolRegex.test(char)) {
			const symData: gridLocation = {
				x: charN,
				y: parseInt(lineN),
				symbol: char,
				numbers: []
			}
			symbolMap.push(symData)
		}
	}
}

for (const lineN in lines) {
	const line = lines[parseInt(lineN)]
	for (const match of line.matchAll(numberRegex)) {
		const num = parseInt(match[0])
		for (
			let y = match.index || 0;
			y < (match.index || 0) + match[0].length;
			y++
		) {
			let nextNumber = true
			const squareData: gridLocation = { x: y, y: parseInt(lineN) }
			for (const translation of squareTranslations) {
				if (
					squareData.x + translation.x < 0 ||
					squareData.x + translation.x >= line.length
				)
					continue
				if (
					squareData.y + translation.y < 0 ||
					squareData.y + translation.y >= line.length
				)
					continue

				const tempData = {
					x: squareData.x + translation.x,
					y: squareData.y + translation.y
				}

				for (const symI in symbolMap) {
					const sym = symbolMap[symI]
					if (sym.x === tempData.x && sym.y === tempData.y) {
						if (sym.symbol === "*") {
							symbolMap[symI].numbers?.push(num)
						}
						nextNumber = false
						sum += num
						break
					}
				}

				if (!nextNumber) break
			}
			if (!nextNumber) break
		}
	}
}

console.log(`Part 1: ${sum}`)

let totalGearRatio = 0

for (const sym of symbolMap) {
	if (sym.numbers ? sym.numbers.length >= 2 : false) {
		totalGearRatio += sym.numbers?.reduce((acc, val) => acc * val) || 0
	}
}
console.log(`Part 2: ${totalGearRatio}`)
