const CorrectAnswerSelect: React.FC<{ formik: any }> = ({ formik }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-white"
        htmlFor="correctAnswer"
      >
        Correct Answer
      </label>
      <select
        name="correctAnswer"
        id="correctAnswer"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.correctAnswer}
        required
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select correct answer</option>
        {values.choices.map((choice: string, index: number) => (
          <option key={index} value={choice}>
            {choice}
          </option>
        ))}
      </select>
      {touched.correctAnswer && errors.correctAnswer && (
        <div className="error">{errors.correctAnswer}</div>
      )}
    </div>
  );
};

export default CorrectAnswerSelect;
