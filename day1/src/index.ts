import * as fs from "fs";
import path from "path";

const fullFile = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const lines = fullFile.split("\r\n");
const digits = parseInput(lines);

const digitSum = digits.reduce((acc: number, digit: number): number => {
  return acc + digit;
}, 0);

console.log("Sum: " + digitSum);

/**
 * Search through string for numbers
 * @param input Lines to search for Numbers
 * @returns Array of Numbers in input
 */
function parseInput(input: string[]): number[] {
  const foundNumbers: number[] = [];
  const expression = /\d/g;
  input.forEach((value) => {
    const extracted = value.match(expression) ?? [];
    foundNumbers.push(Number(extracted[0] + extracted[extracted.length - 1]));
  });

  return foundNumbers;
}
