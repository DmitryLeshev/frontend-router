import React, { useState } from "react";
import { IItemMenu } from "shared/ui/components/Select";

interface Props {
  items: IItemMenu[];
  selectedValue?: number;
  label?: string;
}

export default (props: Props) => {
  const [value, setValue] = useState<number>(props.selectedValue ?? 0);

  React.useEffect(() => {
    setValue(props.selectedValue ?? 0);
  }, [props.selectedValue]);

  function onChange(event: React.ChangeEvent<{ value: number }>) {
    setValue(event.target.value);
  }

  function reset() {
    setValue(0);
  }
  return { value, onChange, items: props.items, label: props.label, reset };
};
