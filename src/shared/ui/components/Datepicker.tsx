import React from "react";
import {
  BaseTextFieldProps,
  createStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";

interface Props {
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  defaultValue?: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Datepicker = (props: Props) => {
  const { className, ...datepickerProps } = props;
  const classes = useStyles();
  return (
    <TextField
      className={clsx(classes.datepicker, className)}
      variant="outlined"
      size="small"
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      {...datepickerProps}
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    datepicker: {},
  })
);

export default Datepicker;
