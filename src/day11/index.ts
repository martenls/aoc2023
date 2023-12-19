import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))
  let sum = 0
  let emptyRowPositions = []
  let galaxyYPositions = []
  for (let y = 0; y < input.length; y++) {
    let foundGalaxy = false
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] == "#") {
        for (let galaxy of galaxyYPositions) {
          sum +=
            y -
            galaxy +
            emptyRowPositions.filter((row) => row < y && row > galaxy).length
        }
        galaxyYPositions.push(y)
        foundGalaxy = true
      }
    }
    if (!foundGalaxy) {
      emptyRowPositions.push(y)
    }
  }
  let emptyColumnPositions = []
  let galaxyXPositions = []
  for (let x = 0; x < input[0].length; x++) {
    let foundGalaxy = false
    for (let y = 0; y < input.length; y++) {
      if (input[y][x] == "#") {
        for (let galaxy of galaxyXPositions) {
          sum +=
            x -
            galaxy +
            emptyColumnPositions.filter((col) => col < x && col > galaxy).length
        }
        galaxyXPositions.push(x)
        foundGalaxy = true
      }
    }
    if (!foundGalaxy) {
      emptyColumnPositions.push(x)
    }
  }

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))
  let sum = 0
  let emptyRowPositions = []
  let galaxyYPositions = []
  for (let y = 0; y < input.length; y++) {
    let foundGalaxy = false
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] == "#") {
        for (let galaxy of galaxyYPositions) {
          sum +=
            y -
            galaxy +
            (1000000 - 1) *
              emptyRowPositions.filter((row) => row < y && row > galaxy).length
        }
        galaxyYPositions.push(y)
        foundGalaxy = true
      }
    }
    if (!foundGalaxy) {
      emptyRowPositions.push(y)
    }
  }
  let emptyColumnPositions = []
  let galaxyXPositions = []
  for (let x = 0; x < input[0].length; x++) {
    let foundGalaxy = false
    for (let y = 0; y < input.length; y++) {
      if (input[y][x] == "#") {
        for (let galaxy of galaxyXPositions) {
          sum +=
            x -
            galaxy +
            (1000000 - 1) *
              emptyColumnPositions.filter((col) => col < x && col > galaxy)
                .length
        }
        galaxyXPositions.push(x)
        foundGalaxy = true
      }
    }
    if (!foundGalaxy) {
      emptyColumnPositions.push(x)
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 1030,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
