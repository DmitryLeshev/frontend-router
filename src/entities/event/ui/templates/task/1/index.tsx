import React, { PropsWithChildren } from "react";

import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

// {
//   "subtitle": "Уязвимость",
//   "description": "Пароль '{{password}}' обнаружен в списке стандартных или часто используемых."
// },

type Props = PropsWithChildren<any>;

export default (props: Props) => {
  const classes = useStyles();
  console.log({ props });

  return (
    <>
      <ul className={classes.list}>
        <li className={classes.item}>
          <p className={clsx(classes.text, classes.login)}>Логины</p>
          <p className={clsx(classes.text, classes.password)}>Пароли</p>
        </li>
        {props?.body?.params.map((item: any, idx: number) => (
          <li
            key={idx}
            className={clsx(classes.item, { [classes.fixed]: item.fixed })}
          >
            <p className={clsx(classes.text, classes.login)}>{item.login}</p>
            <p className={clsx(classes.text, classes.password)}>
              {item.password}
            </p>
          </li>
        ))}
      </ul>
      {props.children}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    margin: 0,
    padding: 0,
    marginBottom: theme.spacing(3),
    listStyle: "none",
    border: `1px solid ${theme.palette.divider}`,
  },
  item: {
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
  text: {
    width: "50%",
    margin: 0,
    padding: theme.spacing(2),
  },
  password: { borderLeft: `1px solid ${theme.palette.divider}` },
  fixed: {
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      display: "block",
      width: "98%",
      transform: "translateX(1%)",
      borderBottom: `1px solid black`,
    },
  },
  login: {},
}));
