import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0
  input.split("\n").forEach((game) => {
    const id = +(game.split(":")[0].match(/(\d+)/g) ?? [0])[0]
    let rounds = game
      .split(":")[1]
      .split(";")
      .map((r) => r.trim())
    let cubes = { red: 12, green: 13, blue: 14 }
    let valid = true
    for (const set of rounds.flatMap((round) => round.trim().split(","))) {
      if (cubes[set.trim().split(" ")[1]] < +set.trim().split(" ")[0]) {
        valid = false
        break
      }
    }
    if (valid) {
      sum += id
    }
  })

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let sum = 0
  input.split("\n").forEach((game) => {
    const id = +(game.split(":")[0].match(/(\d+)/g) ?? [0])[0]
    let rounds = game
      .split(":")[1]
      .split(";")
      .map((r) => r.trim())
    let cubeMaximums = { red: 0, green: 0, blue: 0 }
    for (const set of rounds.flatMap((round) => round.trim().split(","))) {
      cubeMaximums[set.trim().split(" ")[1]] = Math.max(
        cubeMaximums[set.trim().split(" ")[1]],
        +set.trim().split(" ")[0],
      )
    }
    sum += cubeMaximums.red * cubeMaximums.green * cubeMaximums.blue
  })

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
