import { useState } from "react";

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const resetForm = (newValues = {}) => {
    setValues(newValues);
  };

  return { values, handleChange, resetForm, setValues };
}

export default useForm;
