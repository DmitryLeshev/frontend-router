import { useEffect, useState } from 'react';

interface Props {
  value: string;
  validations: any[];
}

const useValidations = ({ value, validations }: Props) => {
  const [error, setError] = useState<string | boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const validation = (value: string) => {
    if (!touched) return;
    let error: string | boolean = false;
    validations.forEach((v) => {
      if (error) return;
      error = v(value);
    });
    setError(error);
  };

  function onBlur() {
    setTouched(true);
  }

  useEffect(() => {
    validation(value);
  }, [value, touched]);

  return {
    error,
    touched,
    onBlur,
  };
};

export default useValidations;
