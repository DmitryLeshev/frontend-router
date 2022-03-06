import React, { memo, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core";

import { useInput } from "shared/hooks";
import { ITheme } from "shared/ui/theme/theme";
import { Input, IconButton } from "shared/ui/components";
import { AddIcon, RemoveIcon } from "shared/assets/icons";

export interface IInputItem {
  value: string;
  onChange: (event: any) => void;
  icon: any;
}

interface Props {
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
}

export default memo(function EditList({ inputs, setInputs }: Props) {
  const classes = useStyles();
  const input = useInput("");
  const [isValid, setIsValid] = useState<boolean>(true);

  function add() {
    const item = input.value;
    if (item.trim() === "") return;
    setInputs((prev: string[]) => [...prev, item]);
    input.onChange();
  }
  function remove(value: number) {
    const newInpus = inputs.filter((_, idx) => idx !== value);
    setInputs(newInpus);
  }

  function change(event: any) {
    input.onChange(event);
    const { value } = event.target;
    value.split(".").forEach((block: string, idx: number) => {
      const value = Number(block);
      if (idx > 3) {
        return setIsValid(false);
      }
      if (value < 0 || value > 255) return setIsValid(false);
      setIsValid(true);
    });
  }

  return (
    <div className={classes.wrapper}>
      {inputs.map((input, idx) => (
        <Input
          className={classes.field}
          value={input}
          icon={
            <IconButton onClick={() => remove(idx)}>
              <RemoveIcon />
            </IconButton>
          }
          disabled
          key={idx}
        />
      ))}

      <Input
        className={classes.field}
        icon={
          <IconButton onClick={add}>
            <AddIcon />
          </IconButton>
        }
        {...input}
        onChange={change}
        helper={!isValid ? "help" : ""}
      />
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    field: { marginBottom: theme.spacing(1) },
  })
);
