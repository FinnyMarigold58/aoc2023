import * as fs from "fs";

const fullFile: string = fs.readFileSync("input.txt", "utf-8");
const separatedCodes = fullFile.split("\r\n");
console.log(separatedCodes);

function parseInput(input: String[]): Number[] {
  return [];
}
