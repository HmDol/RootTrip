import { useCallback, useState } from 'react';

import validate from '@utils/validation';

const useValidateForm = (intialState) => {
  const [validation, setValidation] = useState(intialState);

  const validateForm = useCallback(async (e) => {
    if (e.target.value <= 0) return;

    const { isValid, error, type } = await validate(
      e.target.name,
      e.target.value,
    );

    setValidation((prevValidation) => ({
      ...prevValidation,
      [type]: isValid ? true : error,
    }));
  }, []);

  return [validation, setValidation, validateForm];
};

export default useValidateForm;
