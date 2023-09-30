import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import {
  SelectQuiz,
  QuestionInput,
  ChoicesInput,
  CorrectAnswerSelect,
} from "../../components";
import { AddQuestionData } from "../../types/global";
import { getSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Session } from "next-auth";

const initialValues: AddQuestionData = {
  quizTitle: "",
  question: "",
  choices: ["", ""],
  correctAnswer: "",
};

const validationSchema = Yup.object({
  quizTitle: Yup.string().required("Quiz title is required"),
  question: Yup.string().required("Question title is required"),
  choices: Yup.array()
    .of(Yup.string().required("Choice cannot be empty"))
    .min(2, "At least two choices are required"),
  correctAnswer: Yup.string().required("Correct answer is required"),
});

const addQuestionToQuiz = async (data: AddQuestionData) => {
  const apiUrl = `${API_BASE_URL}/add-question`;
  try {
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/quizzes";

const AddQuestionPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const addQuestionMutation = useMutation(addQuestionToQuiz);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const questionData = {
        quizTitle: values.quizTitle,
        question: values.question,
        choices: values.choices.filter(Boolean),
        correctAnswer: values.correctAnswer,
        userInfos,
      };

      try {
        await addQuestionMutation.mutateAsync(questionData);
        formik.resetForm();
        setSuccessMessage(
          `Question added successfully to ${questionData.quizTitle}!`
        );
        setErrorMessage("");
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message as string;
        setSuccessMessage("");
        setErrorMessage(
          errorMessage || "Error adding question. Please try again."
        );
      }
    },
  });

  useEffect(() => {
    (async () => {
      const session: Session | null = await getSession();
      if (session?.user) {
        setLoading(false);
        setUserInfos({
          name: session.user.name,
          email: session.user.email,
        });
        return;
      }
      signIn();
    })();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className="text-5xl	">Add Question</h1>
      <form className="w-80 flex flex-col gap-2" onSubmit={formik.handleSubmit}>
        <SelectQuiz formik={formik} />
        <QuestionInput formik={formik} />
        <ChoicesInput formik={formik} />
        <CorrectAnswerSelect formik={formik} />
        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="text-white bg-gradient-to-br w-full from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default AddQuestionPage;
