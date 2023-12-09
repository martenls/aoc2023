import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const hands = input.map((hand) => {
    return { hand: hand.split(" ")[0], bid: +hand.split(" ")[1], type: 1 }
  })
  const lookup = new Map<string, number>([
    ["A", 14],
    ["K", 13],
    ["Q", 12],
    ["J", 11],
    ["T", 10],
  ])

  hands.map((h) => {
    const counts = new Map<string, number>()
    for (let letter of h.hand) {
      counts.set(letter, (counts.get(letter) ?? 0) + 1)
    }
    const values = [...counts.values()]
    if (values.length == 1) {
      h.type = 7
    } else if (values.find((el) => el == 4)) {
      h.type = 6
    } else if (values.find((el) => el == 3)) {
      if (values.find((el) => el == 2)) {
        h.type = 5
      } else {
        h.type = 4
      }
    } else if (values.find((el) => el == 2)) {
      if (values.length == 3) {
        h.type = 3
      } else {
        h.type = 2
      }
    }
  })
  hands.sort((a, b) => {
    if (a.type < b.type) {
      return -1
    } else if (a.type > b.type) {
      return 1
    } else {
      for (let i = 0; i < a.hand.length; i++) {
        const a_letter = lookup.get(a.hand[i]) ?? +a.hand[i]
        const b_letter = lookup.get(b.hand[i]) ?? +b.hand[i]
        if (a_letter < b_letter) {
          return -1
        } else if (a_letter > b_letter) {
          return 1
        }
      }
      return 0
    }
  })

  return hands.reduce((acc, curr, index) => {
    return acc + curr.bid * (index + 1)
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n")
  const hands = input.map((hand) => {
    return { hand: hand.split(" ")[0], bid: +hand.split(" ")[1], type: 1 }
  })
  const lookup = new Map<string, number>([
    ["A", 14],
    ["K", 13],
    ["Q", 12],
    ["J", 0],
    ["T", 10],
  ])

  hands.map((h) => {
    const counts = new Map<string, number>()
    for (let letter of h.hand) {
      counts.set(letter, (counts.get(letter) ?? 0) + 1)
    }
    const values = [...counts.values()]
    if (values.length == 1) {
      h.type = 7
    } else if (values.find((el) => el == 4)) {
      if (counts.has("J")) {
        h.type = 7
      } else {
        h.type = 6
      }
    } else if (values.find((el) => el == 3)) {
      if (values.find((el) => el == 2)) {
        if (counts.has("J")) {
          // JJXXX or JJJXX -> 5 of a kind
          h.type = 7
        } else {
          h.type = 5
        }
      } else {
        if (counts.has("J")) {
          // JXXXY -> 4 of a kind
          h.type = 6
        } else {
          // XXXYZ
          h.type = 4
        }
      }
    } else if (values.find((el) => el == 2)) {
      if (values.length == 3) {
        if (counts.get("J") == 2) {
          // JJXXY -> 4 of a kind
          h.type = 6
        } else if (counts.get("J") == 1) {
          // JXXYY -> full house
          h.type = 5
        } else {
          h.type = 3
        }
      } else {
        if (counts.has("J")) {
          // JJXYZ or JXXYZ -> 3 of a kind
          h.type = 4
        } else {
          h.type = 2
        }
      }
    } else if (counts.has("J")) {
      // JXYZA -> one pair
      h.type = 2
    }
  })
  hands.sort((a, b) => {
    if (a.type < b.type) {
      return -1
    } else if (a.type > b.type) {
      return 1
    } else {
      for (let i = 0; i < a.hand.length; i++) {
        const a_letter = lookup.get(a.hand[i]) ?? +a.hand[i]
        const b_letter = lookup.get(b.hand[i]) ?? +b.hand[i]
        if (a_letter < b_letter) {
          return -1
        } else if (a_letter > b_letter) {
          return 1
        }
      }
      return 0
    }
  })

  // console.log(hands)
  return hands.reduce((acc, curr, index) => {
    return acc + curr.bid * (index + 1)
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
