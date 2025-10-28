"use client";

import { questions, rubrics_correctness, rubrics_completion } from "./data.tsx";

import { useState } from "react";

export default function Home() {
  // score data is stored in array of items {id, feedback, points_deducted}
  // each index represents the question number
  const [score, setScore] = useState(
    questions.map((item) => {
      return { id: item.id, feedback: `hj`, points: item.points };
    }),
  );
  console.log(score);

  const feedback_all = score
    .filter((a) => a.feedback != `hj`)
    .map((item) => {
      return <li key={item.id}>{item.feedback}</li>;
    });

  return (
    <div>
      <h1 style={{ margin: "10px", fontSize: "20px" }}>Homework Grader</h1>
      <div>
        <QuestionPanel questionInfo={questions} onChange={setScore} />
      </div>
      <h1>Calculated Score: {calcScore(score)}</h1>
      <ol>{feedback_all}</ol>
    </div>
  );
}

function calcScore(scores) {
  let result = 0;
  for (const score in scores) {
    console.log(score);
    result = result + scores[score].points;
  }
  return result;
}
function handleScoreChange(setScores, description, number, points, frac) {
  const deducted = points * frac;
  let message = `hj`;
  setScores((scores) => {
    return scores.map((score) => {
      if (score.id == number) {
        if (deducted != 0) {
          message = `- ${deducted}: Question #${number}, ${description}`;
        }
        const newScore = {
          id: score.id,
          feedback: message,
          points: points - deducted,
        };
        return newScore;
      } else {
        return score;
      }
    });
  });
}

function Question({ num, rubrics, points, onCheck }) {
  const [checkIndex, setCheckedIndex] = useState(-1);
  const listItems = rubrics.map((item) => {
    const fraction = item.points;
    return (
      <li key={item.id}>
        <label>
          <input
            type="checkbox"
            checked={checkIndex == item.id ? true : false}
            onChange={() => {
              setCheckedIndex(item.id);
              handleScoreChange(onCheck, item.desc, num, points, fraction);
            }}
          />
          {item.desc}
        </label>
      </li>
    );
  });

  return (
    <>
      <b style={{ margin: "7px" }}>Question {num}</b>
      <ol>{listItems}</ol>
      <p>
        <br />
      </p>
    </>
  );
}

function QuestionPanel({ questionInfo, onChange }) {
  const questionItems = questionInfo.map((item) => {
    return (
      <li key={item.id}>
        <Question
          num={item.id}
          rubrics={
            item.type == "completion" ? rubrics_completion : rubrics_correctness
          }
          points={item.points}
          onCheck={onChange}
        />
      </li>
    );
  });

  return <ol>{questionItems}</ol>;
}
