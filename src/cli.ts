import readline from "readline";
import { sort } from "./sort.js";

function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--(\w+)=(.+)$/);
    if (match) {
      args[match[1]] = match[2];
    }
  }
  return args;
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main(): Promise<void> {
  const args = parseArgs();
  const hasAllFlags = "width" in args && "height" in args && "length" in args && "mass" in args;

  let width: number;
  let height: number;
  let length: number;
  let mass: number;

  if (hasAllFlags) {
    width = Number(args.width);
    height = Number(args.height);
    length = Number(args.length);
    mass = Number(args.mass);
  } else {
    width = Number(await prompt("Enter width (cm): "));
    height = Number(await prompt("Enter height (cm): "));
    length = Number(await prompt("Enter length (cm): "));
    mass = Number(await prompt("Enter mass (kg): "));
  }

  console.log(sort(width, height, length, mass));
}

main();
