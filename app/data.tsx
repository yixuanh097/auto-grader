export const rubrics_completion = [
  {
    id: 0,
    desc: "completed",
    points: 1, // fraction of points earned
  },
  {
    id: 1,
    desc: "no attempt",
    points: 0,
  },
];

export const rubrics_correctness = [
  {
    id: 0,
    desc: "all correct",
    points: 1,
  },
  {
    id: 1,
    desc: "missing/incorrect unit",
    points: 0.9,
  },

  {
    id: 2,
    desc: "incorrect sign",
    points: 0.9,
  },

  {
    id: 3,
    desc: "incorrect answer", // correct approach but incorrect numerical
    points: 0.8,
  },
  {
    id: 4,
    desc: "incorrect approach",
    points: 0.25,
  },
  {
    id: 5,
    desc: "no attempt",
    points: 0,
  },
  {
    id: 6,
    desc: "incoorect equations", // partially correct approach
    points: 0.5,
  },
];
export const MAX_POINTS = 100; // maximum toal points for an assignment

export const questions = [
  {
    id: 1,
    type: "completion", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 5, // max possible points for a questions
  },
  {
    id: 2,
    type: "correctness", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 5, // max possible points for a questions
  },
  {
    id: 3,
    type: "completion", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 5, // max possible points for a questions
  },

  {
    id: 4,
    type: "correctness", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 5, // max possible points for a questions
  },

  {
    id: 5,
    type: "correctness", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },

  {
    id: 6,
    type: "completion", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },

  {
    id: 7,
    type: "completion", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },

  {
    id: 8,
    type: "correctness", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },

  {
    id: 9,
    type: "correctness", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },

  {
    id: 10,
    type: "correctness", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },

  {
    id: 11,
    type: "completion", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },

  {
    id: 12,
    type: "completion", // type can be either based on completion ("completion") or based on correctness ("correctness")
    points: 10, // max possible points for a questions
  },
];
