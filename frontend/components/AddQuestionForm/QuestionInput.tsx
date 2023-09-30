const QuestionInput: React.FC<{ formik: any }> = ({ formik }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;

  return (
    <div>
      <label
        htmlFor="question"
        className="block mb-2 text-sm font-medium text-white"
      >
        Question Title
      </label>
      <input
        type="text"
        name="question"
        id="question"
        value={values.question}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
      {touched.question && errors.question && (
        <div className="error">{errors.question}</div>
      )}
    </div>
  );
};

export default QuestionInput;
