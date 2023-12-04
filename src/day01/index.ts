import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const numbers = input.split("\n").map((line) => {
    const digits = line.match(/\d/g) ?? []
    return Number((digits[0] ?? "").concat(digits[digits?.length - 1] ?? ""))
  })
  return numbers.reduce((prev, curr) => prev + curr)
}

const part2 = (rawInput: string) => {
  const numberDict = new Map<string, string>([
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
  ])
  const input = parseInput(rawInput)
  const regex = new RegExp(
    "(\\d|" + [...numberDict.keys()].join("|") + "){1}",
    "g",
  )

  const numbers = input.split("\n").map((line) => {
    const digits: string[] = []
    let matches: RegExpExecArray | null
    while ((matches = regex.exec(line))) {
      digits.push(matches[0])
      regex.lastIndex = matches.index + 1
    }
    regex.lastIndex = 0
    // console.log(line)
    // console.log(digits)
    const first = numberDict.get(digits[0] ?? "") ?? digits[0] ?? ""
    const last =
      numberDict.get(digits[digits?.length - 1] ?? "") ??
      digits[digits?.length - 1] ??
      ""

    // console.log(Number(first.concat(last)))
    return Number(first.concat(last))
  })
  console.log(numbers.length + "==" + input.split("\n").length)
  return numbers.reduce((prev, curr) => prev + curr)
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
      {
        input: `pqrstsixteen
        twone
        twone3`,
        expected: 50,
      },
      {
        input: `pqrstsxteen
        six
        57239274nine
        00`,
        expected: 65,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
