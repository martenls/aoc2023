import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const sections = input.split("\n\n")
  const seeds = sections.shift()?.split(":")[1].trim().split(" ").map(n => +n) ?? []
  console.log(seeds)
  const mappings = sections.map(s => 
     s.split(":\n")[1].split("\n").map(mappingline => mappingline.trim().split(" ").map(n => +n)).map(mappingline => {
      return {destStart: mappingline[0], srcStart: mappingline[1], rangeLen: mappingline[2]}})
  )
  const locations = []
  for (let x of seeds) {
    for (let mapping of mappings) {
      for (let ml of mapping) {
        if (x >= ml.srcStart && x - ml.srcStart <= ml.rangeLen) {
          x = ml.destStart + (x - ml.srcStart)
          break;
        }
      }
    }
    locations.push(x)
  }
  console.log(locations)
  return Math.min(...locations)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const sections = input.split("\n\n")
  const _seeds = sections.shift()?.split(":")[1].trim().split(" ").map(n => +n) ?? []
  const seeds = []
  for (let i = 0; i < _seeds.length; i += 2) {
    for (let j = 0; j < _seeds[i+1]; j++) {
      seeds.push(_seeds[i] + j)
    }
  }
  console.log(seeds)
  const mappings = sections.map(s => 
     s.split(":\n")[1].split("\n").map(mappingline => mappingline.trim().split(" ").map(n => +n)).map(mappingline => {
      return {destStart: mappingline[0], srcStart: mappingline[1], rangeLen: mappingline[2]}})
  )
  const locations = []
  for (let x of seeds) {
    for (let mapping of mappings) {
      for (let ml of mapping) {
        if (x >= ml.srcStart && x - ml.srcStart <= ml.rangeLen) {
          x = ml.destStart + (x - ml.srcStart)
          break;
        }
      }
    }
    locations.push(x)
  }
  console.log(locations)
  return Math.min(...locations)
}

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
