import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

import { createStyles, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

import { modelAuthCheck } from "processes/auth";
import { viewerModel } from "entities/viewer";

import { useInput, useRouter } from "shared/hooks";

import { Card } from "shared/components";
import { Input, Button, IconButton } from "shared/ui/components";
import { Visibility, VisibilityOff } from "shared/assets/icons";
import { ITheme } from "shared/ui/theme/theme";

interface Props {}

export function AuthByLogin({}: Props) {
  const { history, location } = useRouter();
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState<boolean>(false);

  const classes = useStyles({ show });

  const login = useInput("");
  const password = useInput("", {
    end: (
      <IconButton onClick={() => setShow((prev) => !prev)}>
        {show ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    ),
  });

  const [error, setError] = useState<string | null>(null);
  const [classNameError, setClassNameError] = useState<string>(
    classes.error_hiden
  );

  function errorHandlerAnimation() {
    setClassNameError(classes.error_show);
    const timeout1 = setTimeout(() => {
      setClassNameError(classes.error_hiden);
      const timeout2 = setTimeout(() => {
        setError(null);
        clearTimeout(timeout2);
      }, 300);
      clearTimeout(timeout1);
    }, 2500);
  }

  async function logIn() {
    const args: viewerModel.QueryConfig = {
      login: login.value,
      password: password.value,
    };
    const res = await viewerModel.effects.viewerLogInFx(args);
    await modelAuthCheck.effects.getStatusFx();
    const state: any = location.state;
    const link = (state && state.from) || "/";
    history.replace(link);
  }

  React.useEffect(() => {
    if (!error) return;
    errorHandlerAnimation();
  }, [error]);

  return (
    <Card
      className={classes.card}
      header={
        <Typography className={classes.title} variant="h5">
          {/* {t("auth:enter")} */}
          Авторизация
        </Typography>
      }
      body={
        <>
          <Input
            className={classes.input}
            label={t("auth:login")}
            onPressCallback={{ code: "Enter", cb: logIn }}
            {...login}
          />
          <Input
            className={clsx(classes.input, classes.input_password)}
            label={t("auth:password")}
            type={show ? "text" : "password"}
            onPressCallback={{ code: "Enter", cb: logIn }}
            {...password}
          />
        </>
      }
      footerProps={{ className: classes.footer }}
      footer={
        <>
          <Typography className={clsx(classes.error, classNameError)}>
            {error}
          </Typography>
          <Button className={classes.btn} onClick={logIn}>
            {t("auth:login-to")}
          </Button>
        </>
      }
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column",

      // padding: theme.spacing(2),
      minWidth: 340,
      maxWidth: 340,
      background: "rgba(0, 0, 0, 0)",
      boxShadow: "none",

      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        margin: theme.spacing(3),
      },
    },

    title: {
      width: "100%",

      textAlign: "center",

      margin: theme.spacing(1, 0),

      color: theme.palette.primary.main,

      fontWeight: 700,
    },

    content: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
    },

    input: {
      marginBottom: theme.spacing(2),

      "&:last-child": {
        marginBottom: 0,
      },
    },

    footer: {
      alignItems: "center",
      background: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
    },
    btn: {
      minWidth: "100%",

      // alignSelf: 'stretch',

      marginLeft: "auto",
      margin: theme.spacing(1, 0),

      borderRadius: 40,

      color: theme.palette.primary.main,
      backgroundColor: "rgba(0, 0, 0, 0)",

      fontSize: 14,
      fontWeight: 600,

      border: `2px solid ${theme.palette.primary.main}`,

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
    error: {
      color: theme.palette.error.main,
      transition: "all 0.3s ease-in",
    },
    error_hiden: { opacity: 0, transform: "translateX(-50px)" },
    error_show: { opacity: 1, transform: "translationX(0)" },
    input_password: { fontFamily: "Password" },
  })
);
