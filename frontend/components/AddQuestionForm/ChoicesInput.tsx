const ChoicesInput: React.FC<{ formik: any }> = ({ formik }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;

  const handleAddChoice = () => {
    const newChoices = [...values.choices, ""];
    handleChange({ target: { name: "choices", value: newChoices } });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = [...values.choices];
    newChoices.splice(index, 1);
    handleChange({ target: { name: "choices", value: newChoices } });
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white">
        Choices
      </label>
      {values.choices.map((choice: string, index: number) => (
        <div key={index}>
          <input
            type="text"
            name={`choices[${index}]`}
            value={choice}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          />
          {index > 1 && (
            <button type="button" onClick={() => handleRemoveChoice(index)}>
              Remove
            </button>
          )}
          {touched.choices && errors.choices && errors.choices[index] && (
            <div className="error">{errors.choices[index]}</div>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddChoice}>
        Add Choice
      </button>
    </div>
  );
};

export default ChoicesInput;
