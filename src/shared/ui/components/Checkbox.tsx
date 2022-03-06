import React, { ReactElement } from "react";
import {
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
} from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";

interface Props {
  disabled?: boolean;
  defaultChecked?: boolean;
  color?: "primary" | "secondary";
  name?: string;
  className?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  position?: "top" | "start" | "bottom" | "end";
}

export default (props: Props): ReactElement => {
  const {
    checked,
    color,
    disabled,
    name,
    className,
    defaultChecked,
    onChange,
    label,
    position,
  } = props;
  const classes = useStyles();
  const checkbox = (
    <Checkbox
      className={clsx(classes.checkbox, className)}
      disabled={disabled}
      defaultChecked={defaultChecked}
      color={color}
      name={name}
      checked={checked}
      onChange={onChange}
    />
  );
  return label ? (
    <FormControlLabel
      control={checkbox}
      label={label}
      labelPlacement={position ?? "start"}
    />
  ) : (
    checkbox
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    checkbox: {},
  })
);
