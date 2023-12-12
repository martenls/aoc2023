import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

interface Node {
  left: string
  right: string
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const instructions = input[0]
  const map = new Map<string, Node>()
  for (let nodeString of input.splice(2)) {
    const matches = nodeString.match(
      /([a-zA-Z]{3}) = \(([a-zA-Z]{3}), ([a-zA-Z]{3})\)/,
    )
    if (matches) {
      map.set(matches[1], {
        left: matches[2],
        right: matches[3],
      })
    }
  }
  let cursor = "AAA"
  let counter = 0
  for (let i = 0; i < instructions.length; i = (i + 1) % instructions.length) {
    if (instructions.charAt(i) == "L") {
      cursor = map.get(cursor)?.left
    } else {
      cursor = map.get(cursor)?.right
    }
    counter++
    if (cursor == "ZZZ") {
      break
    }
  }
  return counter
}

function mul_inv(a: number, b: number) {
  var b0 = b
  var x0 = 0
  var x1 = 1
  var q, tmp
  if (b == 1) {
    return 1
  }
  while (a > 1) {
    q = parseInt(a / b)
    tmp = a
    a = b
    b = tmp % b
    tmp = x0
    x0 = x1 - q * x0
    x1 = tmp
  }
  if (x1 < 0) {
    x1 = x1 + b0
  }
  return x1
}

function chineseRemainder(a: number[], n: number[]) {
  console.log(a, n)
  var p = 1
  var i = 1
  var prod = 1
  var sm = 0
  for (i = 0; i < n.length; i++) {
    prod = prod * n[i]
  }
  for (i = 0; i < n.length; i++) {
    p = prod / n[i]
    sm = sm + a[i] * mul_inv(p, n[i]) * p
  }
  return sm % prod
}

function gcd2(a: number, b: number) {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN
  return gcd2(b, a % b)
}
function gcd(array: number[]) {
  // Greatest common divisor of a list of integers
  var n = 0
  for (var i = 0; i < array.length; ++i) n = gcd2(array[i], n)
  return n
}
function lcm2(a: number, b: number) {
  // Least common multiple of 2 integers
  return (a * b) / gcd2(a, b)
}
function lcm(array: number[]) {
  // Least common multiple of a list of integers
  var n = 1
  for (var i = 0; i < array.length; ++i) n = lcm2(array[i], n)
  return n
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const instructions = input[0]
  const map = new Map<string, Node>()
  for (let nodeString of input.splice(2)) {
    const matches = nodeString.match(
      /([a-zA-Z0-9]{3}) = \(([a-zA-Z0-9]{3}), ([a-zA-Z0-9]{3})\)/,
    )
    if (matches) {
      map.set(matches[1], {
        left: matches[2],
        right: matches[3],
      })
    }
  }
  let cursors = [...map.keys()].filter((x) => x.endsWith("A"))
  console.log(cursors)
  let info = []
  for (let j = 0; j < cursors.length; j++) {
    let cursor = cursors[j]
    const seen = new Map<string, number>()
    const pos = new Map<string, number>()
    let ends = []
    let loopsAfter = 0
    let counter = 0
    let looped = false
    for (
      let i = 0;
      i < instructions.length;
      i = (i + 1) % instructions.length
    ) {
      if (instructions.charAt(i) == "L") {
        cursor = map.get(cursor)?.left
      } else {
        cursor = map.get(cursor)?.right
      }
      counter++
      if (cursor.endsWith("Z")) {
        console.log("ends on: " + cursor)
        info.push({ start: cursors[j], endsAt: counter / instructions.length })
        break
      }
    }
  }
  console.log(info)
  return lcm(info.map((x) => x.endsAt)) * instructions.length
}

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
