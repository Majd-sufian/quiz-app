import { useState } from "react";
import { IQuizQuestion } from "../types/global";

interface QuestionCardProps extends IQuizQuestion {}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  choices,
  correctAnswer,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceClick = (choice: string) => {
    setSelectedChoice(choice);
  };

  const isCorrectChoice = (choice: string) => {
    return choice === correctAnswer;
  };

  const getBorderClass = (choice: string) => {
    if (selectedChoice === choice) {
      return isCorrectChoice(choice) ? "border-green-500" : "border-red-500";
    } else {
      return "";
    }
  };

  const getMarkClass = (choice: string) => {
    if (selectedChoice === choice) {
      return isCorrectChoice(choice) ? "text-green-500" : "text-red-500";
    } else {
      return "";
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="container px-6 py-8 mx-auto">
        <h1 className="mt-4 text-periwinkleBlue text-3xl font-semibold text-center capitalize lg:text-4xl">
          {question}
        </h1>

        <div className="mt-6 space-y-8 xl:mt-12">
          {choices.map((choice, index) => (
            <div
              key={index}
              className={`flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl ${getBorderClass(
                choice
              )}`}
              onClick={() => handleChoiceClick(choice)}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 sm:h-9 sm:w-9 ${getMarkClass(
                    choice
                  )} ${getBorderClass(choice)}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="flex flex-col items-center mx-5 space-y-1">
                  <span className="text-white">{choice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
