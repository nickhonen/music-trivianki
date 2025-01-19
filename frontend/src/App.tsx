import { useState } from "react";
import { Button } from "./components/ui/button";
import MusicQuestion from "./components/question";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

function App() {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setMessage("Correct!");
    } else {
      setMessage("Wrong!");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsGameOver(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessage(""); // Clear the message for next question
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
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
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold">Welcome to Music Trivia</h1>
        </div>

        
        <MusicQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          onAnswer={handleAnswerSelection}
        />
          {/* <h2 className="text-2xl font-bold">
            {questions[currentQuestion].question}
          </h2>
          {questions[currentQuestion].options.map((option, index) => (
            <Button key={index} onClick={() => handleAnswerSelection(index)}>
              {option}
            </Button>
          ))} */}
        <div className="flex flex-col gap-5 pt-4 pb-4">
          <p className="text-lg">{message}</p>
          {message && <Button onClick={handleNext}>Next Question</Button>}
          <p>Score: {score}</p>
        </div>
      </div>
    </>
  );
}

export default App;
