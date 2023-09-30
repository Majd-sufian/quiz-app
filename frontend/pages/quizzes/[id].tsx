import { useEffect } from "react";
import { useRouter } from "next/router";
import { useFetchQuizById } from "../api/quizApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuizById, setQuizzes } from "../../store/quizSlice";
import { RootState } from "../../store";
import { IQuiz } from "../../types/global";
import QuestionCard from "../../components/QuestionCard";

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const quizzes = useSelector((state: RootState) => state.quiz.quizzes);

  const { data: quiz, isLoading, isError } = useFetchQuizById(id as string);

  useEffect(() => {
    if (quiz) {
      const existingQuiz = quizzes.find((q: IQuiz) => q._id === quiz._id);
      if (existingQuiz) {
        dispatch(setQuizById({ id: quiz._id, quiz }));
      } else {
        dispatch(setQuizzes([...quizzes, quiz]));
      }
    }
  }, [quiz, quizzes, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!quiz || isError) {
    return <div>Quiz not found</div>;
  }

  return (
    <ul>
      {quiz.questions.map((question, index) => (
        <QuestionCard key={index} {...question} />
      ))}
    </ul>
  );
};

export default QuizPage;
