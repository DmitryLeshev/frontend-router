import { useEffect, useState } from 'react';

export default ({
  initialValue,
  name,
  label,
}: {
  initialValue: string;
  name?: string;
  label?: string;
}) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function onChange(event?: React.ChangeEvent<HTMLInputElement>) {
    if (!event) return setValue('');
    setValue(event.target.value);
  }
  if (!label) return { value, onChange, name };
  return { value, onChange, name, label };
};
