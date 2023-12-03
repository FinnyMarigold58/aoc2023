import { readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let fullFile = readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const lines = fullFile.split("\n")

const digits = parseInput(lines)

const digitSum = digits.reduce((acc: number, digit: number): number => {
	return acc + digit
}, 0)

console.log("Part 1")
console.log(`Sum: ${digitSum}`)

// Part 2

// Idea of replacing with one1one, two2two, etc from Piplup7575
fullFile = fullFile.replace(/one/g, "o1e")
fullFile = fullFile.replace(/two/g, "t2o")
fullFile = fullFile.replace(/three/g, "t3e")
fullFile = fullFile.replace(/four/g, "f4r")
fullFile = fullFile.replace(/five/g, "f5e")
fullFile = fullFile.replace(/six/g, "s6x")
fullFile = fullFile.replace(/seven/g, "s7n")
fullFile = fullFile.replace(/eight/g, "e8t")
fullFile = fullFile.replace(/nine/g, "n9e")

const lines2 = fullFile.split("\n")

const digits2 = parseInput(lines2)

const digitSum2 = digits2.reduce((acc: number, digit: number): number => {
	return acc + digit
}, 0)

console.log("Part 2")
console.log(`Sum: ${digitSum2}`)
/**
 * Search through string for numbers
 * @param input Lines to search for Numbers
 * @returns Array of Numbers in input
 */
function parseInput(input: string[]): number[] {
	const foundNumbers: number[] = []
	const expression = /\d/g

	for (const value of input) {
		const extracted = value.match(expression) ?? []
		foundNumbers.push(Number(extracted[0] + extracted[extracted.length - 1]))
	}

	return foundNumbers
}
