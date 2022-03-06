import React, { ReactElement } from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";

export interface IItemMenu {
  value: number;
  label: string | React.ReactElement;
}

interface Props {
  value: number;
  onChange: (event: React.ChangeEvent<{ value: any }>) => void;
  items: IItemMenu[];
  label?: string;
  className?: string;
  fullWidth?: boolean;
}

export default (props: Props): ReactElement => {
  const { value, onChange, label, items, className, fullWidth } = props;
  const classes = useStyles();
  return (
    <FormControl
      className={clsx(className, classes.formControl)}
      size="small"
      fullWidth={fullWidth}
      variant="outlined"
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select value={value} onChange={onChange} label={label}>
        {items.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    formControl: {},
  })
);
