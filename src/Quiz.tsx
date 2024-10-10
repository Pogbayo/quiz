import { useEffect, useState } from "react";
import { questions } from "./questions";
import RevealAnswers from "./RevealAnswers";

interface AnswerOptionType {
  answerText: string;
  isCorrect: boolean;
}
interface QuestionType {
  questionText: string;
  answerOptions: AnswerOptionType[];
}
const Quiz = () => {
  const [quests, setQuests] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  useEffect(() => {
    setQuests(questions);
  }, []);
  const isCorrectClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quests.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const restartButton = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
  };
  const handleRevealAnswers = () => {
    setShowAnswer(true);
  };
  return (
    <>
      <div className="quizHeader">
        <h1>Quiz</h1>
      </div>
      {quests.length > 0 ? (
        <>
          {showScore ? (
            <div className="showScore">
              <div>
                You scored {score} out of {quests.length}
              </div>
              {showAnswer ? (
                <RevealAnswers />
              ) : (
                <div className="twoButtons">
                  <button
                    className="revealAnswers"
                    onClick={handleRevealAnswers}
                  >
                    Show answers
                  </button>
                </div>
              )}
              <button className="restartButton" onClick={restartButton}>
                Restart
              </button>
            </div>
          ) : (
            <>
              <h3 className="qText">{quests[currentQuestion].questionText}</h3>
              <div className="dotsDiv">
                {quests[currentQuestion].answerOptions.map(
                  (answerOption: AnswerOptionType, index: number) => (
                    <div className="options" key={index}>
                      <span>{index + 1}</span>
                      <button
                        className="button"
                        onClick={() => isCorrectClick(answerOption.isCorrect)}
                      >
                        {answerOption.answerText}
                      </button>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </>
  );
};

export default Quiz;
