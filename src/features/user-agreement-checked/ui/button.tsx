import { Button as UIButton } from "shared/ui/components";

interface Props {
  className?: string;
  label: string;
  disabled?: boolean;
  action?: () => void;
}

export const Button = ({ label, className, disabled, action }: Props) => {
  return (
    <UIButton disabled={disabled} className={className} onClick={action}>
      {label}
    </UIButton>
  );
};
