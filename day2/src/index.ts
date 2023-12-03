import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

type pull = { red: number; green: number; blue: number }

type Game = {
	id: number
	results: pull[]
}

type Colors = "red" | "blue" | "green"

const __dirname = dirname(fileURLToPath(import.meta.url))

const fileData = readFileSync(`${__dirname}/input.txt`, "utf-8")
const parsedGames = parseGameInput(fileData)
const possibleGames = getPossibleGames(parsedGames, {
	red: 12,
	green: 13,
	blue: 14
})
console.log(`Part 1: ${getTotal(possibleGames)}`)

const minimumList: pull[] = []
for (const game of parsedGames) {
	const minimum: pull = {
		red: 0,
		blue: 0,
		green: 0
	}
	for (const pull of game.results) {
		for (const color of Object.keys(pull)) {
			minimum[color as Colors] = Math.max(
				minimum[color as Colors],
				pull[color as Colors]
			)
		}
	}
	minimumList.push(minimum)
}

const powers = minimumList.map((pull) => {
	return pull.red * pull.blue * pull.green
})

console.log(`Part 2: ${powers.reduce((acc, power) => acc + power)}`)

function getTotal(input: Game[]): number {
	return input.reduce((acc, game) => acc + game.id, 0)
}

function getPossibleGames(input: Game[], total: pull): Game[] {
	return input.filter((game) => {
		return game.results.every((pull) => {
			return Object.keys(pull).every((color) => {
				return pull[color as Colors] <= total[color as Colors]
			})
		})
	})
}

function parseGameInput(input: string): Game[] {
	const games: Game[] = []
	const lines = input.split("\n")
	for (const line of lines) {
		const [gameInfo, gameResults] = line.split(": ")

		const id = Number(gameInfo.split(" ")[1])

		const results: pull[] = []

		const pulls = gameResults.split("; ")
		for (const pull of pulls) {
			const pullResult: pull = {
				red: 0,
				blue: 0,
				green: 0
			}
			const cubes = pull.split(", ")
			for (const cube of cubes) {
				const [num, color] = cube.trim().split(" ")
				// @ts-ignore
				pullResult[color as Colors] += Number(num)
			}
			results.push(pullResult)
		}

		games.push({ id, results })
	}
	return games
}
