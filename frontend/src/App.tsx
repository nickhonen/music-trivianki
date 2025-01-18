import { useState } from "react";
import "./App

type Question = {
  question: string
  options: string[]
  correctAnswer: number
}


function App() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions: Question[] = [
    {
      question: "Who sang Purple Rain?",
      options: ["Prince", "Michael Jackson", "Elvis"],
      correctAnswer: 0,
    },
    {
      question: "What year was Bohemian Rhapsody released?",
      options: ["1975", "1973", "1976"],
      correctAnswer: 0,
    },
  ];

  const handleAnswerSelection = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setMessage("Correct!");
    } else {
      setMessage("Wrong!");
    }
    setCurrentQuestion((currentQuestion + 1) % questions.length);
  };

  return (
    <>
      <div className="card text-center">
        <h1>Welcome to Music Trivia</h1>
        <div className="flex flex-col gap-5 pt-4">
          <h2 className="text-2xl font-bold">
            {questions[currentQuestion].question}
          </h2>
          <button onClick={() => handleAnswerSelection(0)}>
            {questions[currentQuestion].options[0]}
          </button>
          <button onClick={() => handleAnswerSelection(1)}>
            {questions[currentQuestion].options[1]}
          </button>
          <button onClick={() => handleAnswerSelection(2)}>
            {questions[currentQuestion].options[2]}
          </button>
          <p className="text-lg">{message}</p>
        </div>
        <button onClick={() => setScore((score) => score + 1)}>
          score is {score}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
