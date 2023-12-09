import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const pqFormula = (p: number, q: number) => {
  return {
    lower: -p / 2 - Math.sqrt((-p / 2) ** 2 - q),
    upper: -p / 2 + Math.sqrt((-p / 2) ** 2 - q),
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const times = [...input[0].matchAll(/\d+/g)].map((t) => +t)
  const distances = [...input[1].matchAll(/\d+/g)].map((t) => +t)
  let result = 1
  // quadratic equation: distance + 1 = time*x - x^2  -> 0 = x^2 - time*x + distance + 1
  for (let i = 0; i < times.length; i++) {
    const zeros = pqFormula(-times[i], distances[i] + 1)
    result *= Math.floor(zeros.upper) - Math.ceil(zeros.lower) + 1
  }
  return result
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const time = +input[0].split(":")[1].replace(/\s/g, "")
  const distance = +input[1].split(":")[1].replace(/\s/g, "")
  const zeros = pqFormula(-time, distance + 1)

  return Math.floor(zeros.upper) - Math.ceil(zeros.lower) + 1
}

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
