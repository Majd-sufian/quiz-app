import { useFetchQuizzes } from "../../pages/api/quizApi";
import { IQuiz } from "../../types/global";

const SelectQuiz: React.FC<{ formik: any }> = ({ formik }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;

  const { data: quizzes } = useFetchQuizzes() as { data: IQuiz[] };

  return (
    <>
      <label
        htmlFor="quizTitle"
        className="block mb-2 text-sm font-medium  text-white"
      >
        Select Quiz
      </label>
      <select
        name="quizTitle"
        id="quizTitle"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.quizTitle}
        required
        className="border rounded-md text-sm rounded-lgblock w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      >
        {quizzes?.map((quiz: IQuiz) => (
          <option key={quiz._id} value={quiz.title}>
            {quiz.title}
          </option>
        ))}
      </select>
      {touched.quizTitle && errors.quizTitle && (
        <div className="error">{errors.quizTitle}</div>
      )}
    </>
  );
};

export default SelectQuiz;
