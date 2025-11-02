"use client";

import Image from "next/image";

import { PanelGroup, PanelResizeHandle, Panel } from "react-resizable-panels";

import { renderToStaticMarkup } from "react-dom/server";

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
      <div>
        <h1>Calculated Score: {calcScore(score)}</h1>
        <ol>{feedback_all}</ol>
        <button
          onClick={() => {
            copyToClipBoard(feedback_all);
          }}
          style={{
            backgroundColor: "grey",
            color: "black",
            padding: "3px 5px",
            borderRadius: "3px",
          }}
        >
          copy to clipboard
        </button>
      </div>
    </div>
  );
}
async function copyToClipBoard(text) {
  const formatted = renderToStaticMarkup(text)
    .replaceAll("<li>", "")
    .replaceAll("</li>", "\n");
  try {
    await navigator.clipboard.writeText(formatted);
  } catch (err) {
    console.error("failed to copy text", err);
  }
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

function Question({ num, rubrics, points, onCheck, answer }) {
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
          {item.desc}: -{fraction * points}
        </label>
      </li>
    );
  });

  return (
    <>
      <PanelGroup direction="horizontal">
        <Panel
          defaultSize={30}
          minSize={20}
          className="bg-slate-100 rounded-lg flex items-center justify-left text-left p-3"
        >
          <b style={({ margin: "10px" }, { fontSize: "17px" })}>
            Question {num}: {points} ~~~~
          </b>
          <ol>{listItems}</ol>
          <p>
            <br />
          </p>
        </Panel>
        <PanelResizeHandle className="w-2 bg-slate-300" />
        <Panel defaultSize={30} minSize={20}>
          {renderImage(answer)}
        </Panel>
      </PanelGroup>
      <br />
    </>
  );
}
async function renderImage(path) {
  console.log(path);
  return (
    <>
      <Image width={300} height={300} src={path} alt={"answer key"} />
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
          answer={item.answer}
        />
      </li>
    );
  });

  return <ol>{questionItems}</ol>;
}
