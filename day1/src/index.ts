import * as fs from "fs";
import path from "path";

let fullFile = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lines = fullFile.split("\n");

const digits = parseInput(lines);

const digitSum = digits.reduce((acc: number, digit: number): number => {
  return acc + digit;
}, 0);

console.log("Part 1");
console.log("Sum: " + digitSum);

// Part 2

// Idea of replacing with one1one, two2two, etc from
fullFile = fullFile.replace(/one/g, "one1one");
fullFile = fullFile.replace(/two/g, "two2two");
fullFile = fullFile.replace(/three/g, "three3three");
fullFile = fullFile.replace(/four/g, "four4four");
fullFile = fullFile.replace(/five/g, "five5five");
fullFile = fullFile.replace(/six/g, "six6six");
fullFile = fullFile.replace(/seven/g, "seven7seven");
fullFile = fullFile.replace(/eight/g, "eight8eight");
fullFile = fullFile.replace(/nine/g, "nine9nine");

let lines2 = fullFile.split("\n");

const digits2 = parseInput(lines2);

const digitSum2 = digits2.reduce((acc: number, digit: number): number => {
  return acc + digit;
}, 0);

console.log("Part 2");
console.log("Sum: " + digitSum2);

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

  console.log(foundNumbers);

  return foundNumbers;
}
