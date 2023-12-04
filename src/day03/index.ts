import run from "aocrunner"

interface PartNumber {
  number: number
  start: number
  end: number
  enginePart: boolean
}

interface Gear {
  pos: number
  count: number
  ratio: number
}

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0
  let prevNumbers: PartNumber[] = []
  let currNumbers: PartNumber[] = []
  let prevSymbols: number[] = []
  let currSymbols: number[] = []
  input.split("\n").forEach((line) => {
    line = line.trim()
    for (const match of line.matchAll(/\d+/g)) {
      currNumbers.push({
        number: +match[0],
        start: Math.max(0, (match.index ?? 0) - 1),
        end: (match.index ?? 0) + match[0].length,
        enginePart: false,
      } as PartNumber)
    }
    for (const match of line.matchAll(/([^\d\.]{1})/g)) {
      currSymbols.push(match.index ?? -1)
    }
    for (const number of prevNumbers) {
      number.enginePart =
        number.enginePart ||
        currSymbols.filter(
          (symbol) => symbol >= number.start && symbol <= number.end,
        ).length > 0
    }
    for (const number of currNumbers) {
      number.enginePart =
        number.enginePart ||
        currSymbols.filter(
          (symbol) => symbol >= number.start && symbol <= number.end,
        ).length > 0 ||
        prevSymbols.filter(
          (symbol) => symbol >= number.start && symbol <= number.end,
        ).length > 0
    }
    prevNumbers.forEach(
      (number) => (sum += number.enginePart ? number.number : 0),
    )
    // console.log(prevNumbers)
    // console.log(prevSymbols)
    // console.log(currSymbols)
    prevNumbers = currNumbers
    currNumbers = []
    prevSymbols = currSymbols
    currSymbols = []
  })
  prevNumbers.forEach(
    (number) => (sum += number.enginePart ? number.number : 0),
  )

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0
  let prevNumbers: PartNumber[] = []
  let currNumbers: PartNumber[] = []
  let prevGears: Gear[] = []
  let currGears: Gear[] = []
  input.split("\n").forEach((line) => {
    line = line.trim()
    for (const match of line.matchAll(/\d+/g)) {
      currNumbers.push({
        number: +match[0],
        start: Math.max(0, (match.index ?? 0) - 1),
        end: (match.index ?? 0) + match[0].length,
        enginePart: false,
      } as PartNumber)
    }
    for (const match of line.matchAll(/\*{1}/g)) {
      currGears.push({ pos: match.index ?? -1, count: 0, ratio: 1 } as Gear)
    }
    for (const gear of prevGears) {
      currNumbers.forEach((number) => {
        if (gear.pos >= number.start && gear.pos <= number.end) {
          gear.count++
          gear.ratio *= number.number
        }
      })
    }
    for (const gear of currGears) {
      currNumbers.forEach((number) => {
        if (gear.pos >= number.start && gear.pos <= number.end) {
          gear.count++
          gear.ratio *= number.number
        }
      })
      prevNumbers.forEach((number) => {
        if (gear.pos >= number.start && gear.pos <= number.end) {
          gear.count++
          gear.ratio *= number.number
        }
      })
    }
    prevGears.forEach((gear) => (sum += gear.count == 2 ? gear.ratio : 0))
    // console.log(prevNumbers)
    // console.log(prevGears)
    // console.log(currGears)
    prevNumbers = currNumbers
    currNumbers = []
    prevGears = currGears
    currGears = []
  })
  prevGears.forEach((gear) => (sum += gear.count == 2 ? gear.ratio : 0))

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
