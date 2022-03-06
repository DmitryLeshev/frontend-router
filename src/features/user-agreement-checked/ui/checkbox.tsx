import { Checkbox as UICheckbox } from "shared/ui/components";

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ checked, onChange, label }: Props) => {
  return (
    <UICheckbox
      label={label}
      checked={checked}
      onChange={onChange}
      position="end"
    />
  );
};
