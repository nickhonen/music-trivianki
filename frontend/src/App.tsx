import { useState } from "react";
import "./App.css";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

function App() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setIsGameOver(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setMessage(""); // Clear the message for next question
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setMessage("");
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="card text-center">
        <h1>Game Over!</h1>
        <p>
          Final Score: {score}/{questions.length}
        </p>
        <button onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  return (
    <>
      <div className="card text-center">
        <h1>Welcome to Music Trivia</h1>
        <div className="flex flex-col gap-5 pt-4">
          <h2 className="text-2xl font-bold">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerSelection(index)}>
              {option}
            </button>
          ))}
          <p className="text-lg">{message}</p>
          {message && <button onClick={handleNext}>Next Question</button>}
          <p>Score: {score}</p>
        </div>
      </div>
    </>
  );
}

export default App;
