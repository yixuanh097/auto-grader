"use client";

import {
  questions,
  rubrics_correctness,
  rubrics_completion,
  MAX_POINTS,
} from "./data.tsx";

import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState([]);
  return (
    <div>
      <h1 style={{ margin: "10px", fontSize: "20px" }}>Homework Grader</h1>
      <div>
        <QuestionPanel questionInfo={questions} />
      </div>
      <h1>
        Calculated Score:{" "}
        {score.map((item) => {
          return <li key={item.id}>item.message</li>;
        })}
      </h1>
    </div>
  );
}

function handleScoreChange({ setScores, description, number, points }) {
  const message = `- ${points}: Question #${num}, ${description}`;
  setScores();
}

function Question({ num, rubrics, points }) {
  const [checkIndex, setCheckedIndex] = useState(-1);
  const listItems = rubrics.map((item) => {
    return (
      <li key={item.id}>
        <label>
          <input
            type="checkbox"
            checked={checkIndex == item.id ? true : false}
            onChange={() => {
              setCheckedIndex(item.id);
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

function QuestionPanel({ questionInfo }) {
  const questionItems = questionInfo.map((item) => {
    return (
      <li key={item.id}>
        <Question
          num={item.id}
          rubrics={
            item.type == "completion" ? rubrics_completion : rubrics_correctness
          }
          points={item.points}
        />
      </li>
    );
  });

  return <ol>{questionItems}</ol>;
}
