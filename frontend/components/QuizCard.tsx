import Link from "next/link";
import { IQuiz } from "../types/global";

interface QuizCardProps {
  quiz: IQuiz;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quiz: { title, description, imgURL, _id },
}) => {
  return (
    <div className="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700 text-center">
      <img className="rounded-t-lg w-full h-52" src={imgURL} alt="Quiz image" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-400">{description}</p>
        <Link href={`/quizzes/${_id}`}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Take Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
