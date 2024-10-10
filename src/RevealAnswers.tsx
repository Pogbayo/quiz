import { questions } from "./questions";

const RevealAnswers = () => {
  return (
    <div className="answerDiv">
      {questions.map((question, index) => (
        <div key={index} className="ansDivs">
          <p className="answerNo">{index}</p>
          <p className="answerQt">{question.questionText}</p>
          <p className="answerScore">
            Correct answer:{" "}
            {
              question.answerOptions.find((option) => option.isCorrect)
                ?.answerText
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default RevealAnswers;
