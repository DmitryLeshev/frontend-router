import React, { useEffect, useState } from "react";

interface IExportsInput {
  value: string;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  error?: string | boolean;
  touched?: boolean;
  onBlur?: () => void;
  placeholder?: string;
  start?: React.ReactElement | string;
  end?: React.ReactElement | string;
}

interface Options {
  name?: string;
  label?: string;
  placeholder?: string;
  validations?: any[];
  start?: React.ReactElement | string;
  end?: React.ReactElement | string;
  error?: string | boolean;
}

export default (initialValue: string, options?: Options) => {
  const { label, name, validations, placeholder, start, end } = options ?? {};
  const [value, setValue] = useState<string>(initialValue ?? "");
  const [error, setError] = useState<string | boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  function onChange(event?: React.ChangeEvent<HTMLInputElement>) {
    if (!event) {
      setValue("");
      setTouched(false);
      setError(false);
      return;
    }
    setValue(event.target.value);
  }

  function onBlur() {
    setTouched(true);
  }

  const validation = (value: string) => {
    if (!touched) return;
    let error: string | boolean = false;
    validations &&
      validations.forEach((v) => {
        if (error) return;
        error = v(value);
      });
    setError(error);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    validation(value);
  }, [value, touched]);

  let exports: IExportsInput = { value, onChange };

  if (name) exports.name = name;
  if (start) exports.start = start;
  if (end) exports.end = end;
  if (placeholder) exports.placeholder = placeholder;
  if (label) exports.label = label;
  if (validations) {
    exports.error = error;
    exports.touched = touched;
    exports.onBlur = onBlur;
  }

  return exports;
};
