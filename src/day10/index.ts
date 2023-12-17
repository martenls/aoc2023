import run from "aocrunner"
import fs from "node:fs"

const parseInput = (rawInput: string) => rawInput

function getStartPos(input: string[][]): number[] {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] == "S") {
        return [x, y]
      }
    }
  }
  return [0, 0]
}

interface Node {
  x: number
  y: number
  depth: number
  visitedFrom: number[]
  prevNode: Node | undefined
}

const dirsByTunnelElem = new Map<string, number[][]>([
  [
    "|",
    [
      [0, -1],
      [0, 1],
    ],
  ],
  [
    "-",
    [
      [-1, 0],
      [1, 0],
    ],
  ],
  [
    "L",
    [
      [0, -1],
      [1, 0],
    ],
  ],
  [
    "J",
    [
      [0, -1],
      [-1, 0],
    ],
  ],
  [
    "7",
    [
      [0, 1],
      [-1, 0],
    ],
  ],
  [
    "F",
    [
      [0, 1],
      [1, 0],
    ],
  ],
  [
    "S",
    [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ],
  ],
])

function getNextDir(input: string[][], currNode: Node) {
  const dirs = dirsByTunnelElem.get(input[currNode.y][currNode.x])

  return dirs?.filter(
    (x) => x.join(",") != currNode.visitedFrom.map((x) => x * -1).join(","),
  )
}

function isValidNextNode(
  input: string[][],
  x: number,
  y: number,
  dir: number[],
): boolean {
  return (
    x >= 0 &&
    x < input[0].length &&
    y >= 0 &&
    y < input.length &&
    (dirsByTunnelElem
      .get(input[y][x])
      ?.find((x) => x.join(",") == dir.map((x) => x * -1).join(","))
      ? true
      : false)
  )
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))

  // console.log(input)
  let start = getStartPos(input)
  let seen = new Set<string>()

  let nodes = [
    {
      x: start[0],
      y: start[1],
      depth: 0,
      visitedFrom: [],
      prevNode: undefined,
    } as Node,
  ]
  let node = nodes[0]
  let i = 0
  while (!seen.has(node.x + "," + node.y)) {
    // console.log(node.x + "," + node.y)
    // console.log("nextDirs: " + getNextDir(input, node))
    for (const dir of getNextDir(input, node) ?? []) {
      const nextX = node.x + dir[0]
      const nextY = node.y + dir[1]
      if (isValidNextNode(input, nextX, nextY, dir)) {
        nodes.push({
          x: nextX,
          y: nextY,
          depth: node.depth + 1,
          visitedFrom: dir,
          prevNode: node,
        })
      }
    }

    // console.log(nodes)

    seen.add(node.x + "," + node.y)
    node = nodes[++i]
  }

  return node.depth
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .map((line) => line.split(""))

  // console.log(input)
  let start = getStartPos(input)
  let seen = new Set<string>()

  let nodes = []
  let node: Node | undefined = {
    x: start[0],
    y: start[1],
    depth: 0,
    visitedFrom: [],
    prevNode: undefined,
  } as Node
  while (node != undefined && !seen.has(node.x + "," + node.y)) {
    // console.log(node.x + "," + node.y)
    // console.log("nextDirs: " + getNextDir(input, node))
    for (const dir of getNextDir(input, node) ?? []) {
      const nextX = node.x + dir[0]
      const nextY = node.y + dir[1]
      if (isValidNextNode(input, nextX, nextY, dir)) {
        nodes.push({
          x: nextX,
          y: nextY,
          depth: node.depth + 1,
          visitedFrom: dir,
          prevNode: node,
        })
      }
    }

    // console.log(nodes)

    seen.add(node.x + "," + node.y)
    node = nodes.pop()
  }
  const loopParts = new Set<string>()
  let secondNode = node?.prevNode
  let lastNode
  console.log(secondNode)
  while (node?.prevNode) {
    // console.log(node.x + ", " + node.y)
    loopParts.add(node.x + "," + node.y)
    if (!node.prevNode?.prevNode) {
      lastNode = node
    }
    node = node.prevNode
  }
  let startDirs = [
    [secondNode.x - start[0], secondNode.y - start[1]],
    [lastNode.x - start[0], lastNode.y - start[1]],
  ]
    .map((x) => x.join(","))
    .join(";")
  for (let [key, value] of dirsByTunnelElem.entries()) {
    if (
      value.map((x) => x.join(",")).join(";") == startDirs ||
      value
        .reverse()
        .map((x) => x.join(","))
        .join(";") == startDirs
    ) {
      input[start[1]][start[0]] = key
    }
  }

  let enclosedTiles = 0
  for (let y = 0; y < input.length; y++) {
    let inside = false
    let prevCorner = ""
    for (let x = 0; x < input[y].length; x++) {
      const tile = input[y][x]
      if (loopParts.has(x + "," + y)) {
        switch (tile) {
          case "|":
            inside = !inside
            break
          case "J":
            if (prevCorner == "F") inside = !inside
            prevCorner = "J"
            break
          case "7":
            if (prevCorner == "L") inside = !inside
            prevCorner = "7"
            break
          case "L":
          case "F":
            prevCorner = tile
            break
        }
      } else {
        if (inside) {
          enclosedTiles++
          input[y][x] = "I"
        } else {
          input[y][x] = "O"
        }
      }
    }
  }
  fs.writeFileSync("./output.txt", input.map((y) => y.join("")).join("\n"))
  // console.table(input)
  return enclosedTiles
}

run({
  part1: {
    tests: [
      {
        input: `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`,
        expected: 4,
      },
      {
        input: `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
        expected: 8,
      },
      {
        input: `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
