import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

// Info about a symbol
type SymbolData = {
	coords: Coords
	symbol: string
	numbers: number[]
}

type Coords = {
	row: number
	column: number
}

// Get input
const __dirname = dirname(fileURLToPath(import.meta.url))
const filename = "example.txt"

const file = readFileSync(`${__dirname}/${filename}`, "utf-8")
const lines = file.split("\r\n")

const nearbysquares: Coords[] = [
	{ row: -1, column: -1 },
	{ row: -1, column: 0 },
	{ row: -1, column: 1 },
	{ row: 0, column: -1 },
	{ row: 0, column: 1 },
	{ row: 1, column: -1 },
	{ row: 1, column: 0 },
	{ row: 1, column: 1 }
]

// Grid of symbols
const symbolGrid: SymbolData[] = []

// Populate symbol grid with symboldata
for (const row in lines) {
	const rowData = lines[parseInt(row)]
	for (let index = 0; index < rowData.length; index++) {
		const char = rowData[index]
		if (char === "." || Number.isInteger(parseInt(char))) continue
		const data = {
			coords: {
				column: index,
				row: parseInt(row)
			},
			symbol: char,
			numbers: []
		}
		symbolGrid.push(data)
	}
}

// Find all numbers
let sum = 0
for (const rowI in lines) {
	const row = lines[parseInt(rowI)]
	for (const match of row.matchAll(/\d+/g)) {
		const num = parseInt(match["0"])
		const surroundingSquares: Coords[] = []
		for (const nearbyTranslation of nearbysquares) {
			for (let index = 0; index < match[0].length; index++) {
				const squareData = {
					row: parseInt(rowI),
					column: index
				}
				surroundingSquares.push({
					row: squareData.row + nearbyTranslation.row,
					column: squareData.column + nearbyTranslation.row
				})
			}
		}

		for (const surroundingSquare of surroundingSquares) {
			for (const symbol of symbolGrid) {
				if (
					symbol.coords.column === surroundingSquare.column &&
					symbol.coords.row === surroundingSquare.row
				) {
					sum += num
					break
				}
			}
		}
	}
}
console.log(sum)
