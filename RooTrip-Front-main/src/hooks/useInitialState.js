import { useCallback, useState } from 'react';

const useInitialState = (initialValue) => {
  const [form, setForm] = useState(initialValue);

  const resetForm = useCallback(() => {
    setForm(initialValue);
  }, [initialValue]);

  return [form, setForm, resetForm];
};

export default useInitialState;
