import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuizCard from "../components/QuizCard";
import { RootState } from "../store";
import { setQuizzes } from "../store/quizSlice";
import { IQuiz } from "../types/global";
import { useFetchQuizzes } from "./api/quizApi";

const QuizzesPage: NextPage = () => {
  const dispatch = useDispatch();
  const { data: quizzes, isLoading, isError } = useFetchQuizzes();
  const { quizzes: storedQuizzes } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    if (quizzes) {
      dispatch(setQuizzes(quizzes));
    }
  }, [dispatch, quizzes]);

  if (isLoading) {
    return <div>Loading quizzes...</div>;
  }

  if (isError) {
    return <div>Error fetching quizzes</div>;
  }

  return (
    <ul className="flex gap-6 pt-6 p-12 flex-wrap justify-center">
      {storedQuizzes.map((quiz: IQuiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </ul>
  );
};

export default QuizzesPage;
