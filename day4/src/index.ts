type Card = {
	cardInfo: string
	winningNumbers: number[]
	numbersYouGot: number[]
}

import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileName = "example.txt"

const data = readFileSync(`${__dirname}/${fileName}`, "utf-8")
const parsedInput = parseInput(data)
const totalValue = calculateTotal(parsedInput)
console.log(`Part 1: ${totalValue}`)

function parseInput(input: string): Array<Card> {
	const returnArray: Array<Card> = []
	const cards = input.split("\r\n")

	for (const card of cards) {
		const [cardInfo, numberInfo] = card.split(": ")
		const [winningNumbersList, numbersYouGotList] = numberInfo.split(" | ")
		const winningNumbers = winningNumbersList
			.split(" ")
			.map((val) => parseInt(val))
			.filter((val) => val)
		const numbersYouGot = numbersYouGotList
			.split(" ")
			.map((val) => parseInt(val))
			.filter((val) => val)
		returnArray.push({ cardInfo, winningNumbers, numbersYouGot })
	}

	return returnArray
}

function calculateTotal(cards: Array<Card>): number {
	let total = 0
	for (const card in cards) {
		const cardVal = calculateValue(cards[card])
		total += cardVal
	}
	return total
}

function calculateValue(card: Card): number {
	let value = 0
	for (const winNumber of card.winningNumbers) {
		for (const ownedNumber of card.numbersYouGot) {
			if (ownedNumber !== winNumber) continue
			if (value !== 0) {
				value = value * 2
				continue
			}
			value++
		}
	}
	return value
}
