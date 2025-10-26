import {
  questions,
  rubrics_correctness,
  rubrics_completion,
  MAX_POINTS,
} from "./data.tsx";

export default function Home() {
  return (
    <div>
      <h1 style={{ margin: "10px", fontSize: "20px" }}>Homework Grader</h1>
      <div>
        <QuestionPanel questionInfo={questions} />
      </div>
    </div>
  );
}

function Question({ num, rubrics }) {
  const listItems = rubrics.map((item) => {
    return (
      <li key={item.id}>
        <label>
          <input type="checkbox" />
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
        />
      </li>
    );
  });

  return <ol>{questionItems}</ol>;
}
