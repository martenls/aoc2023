import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  let sum = 0
  let currSeq = []
  for (let line of input) {
    currSeq = line.split(" ").map((x) => parseInt(x))
    let lastNumbers = [currSeq[currSeq.length - 1]]
    // console.log(currSeq)
    while (currSeq.filter((x) => x != 0).length > 0) {
      let nextSeq = []
      for (let i = 1; i < currSeq.length; i++) {
        nextSeq.push(currSeq[i] - currSeq[i - 1])
      }
      if (nextSeq.length > 1) lastNumbers.push(nextSeq[nextSeq.length - 1])

      currSeq = nextSeq
      // console.log(currSeq)
    }
    // console.log(lastNumbers)
    // console.log(currSeq)
    sum += lastNumbers.reduce((acc, curr) => (acc += curr))
  }

  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  let diff = 0
  let currSeq = []
  for (let line of input) {
    currSeq = line.split(" ").map((x) => parseInt(x))
    let firstNumbers = [currSeq[0]]
    // console.log(currSeq)
    while (currSeq.filter((x) => x != 0).length > 0) {
      let nextSeq = []
      for (let i = 1; i < currSeq.length; i++) {
        nextSeq.push(currSeq[i] - currSeq[i - 1])
      }
      if (nextSeq.length > 1) firstNumbers.push(nextSeq[0])

      currSeq = nextSeq
      // console.log(currSeq)
    }

    // console.log(currSeq)
    diff += firstNumbers.reverse().reduce((acc, curr) => (acc = curr - acc))
  }
  return diff
}

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
