import React, { memo, useState } from "react";

import {
  useModal,
  useInput,
  useValidations,
  useResponseSnackbar,
} from "shared/hooks";
import { Card, Modal } from "shared/components";
import {
  Typography,
  Button,
  Input,
  Checkbox,
  IconButton,
} from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import {
  minValue,
  stringMustContainCpecoalCharacter,
  stringMustContainNumber,
} from "shared/utils/validations";
import api from "shared/api.old";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";
import clsx from "clsx";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

interface Props extends IAppContext {}

function LoginPass({ toggleLoader }: Props) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useResponseSnackbar();
  const usemodal = useModal();
  const login = useInput("");
  const loginValid = useValidations({
    validations: [minValue(6)],
    value: login.value,
  });
  const password = useInput("");
  const passwordValid = useValidations({
    validations: [
      stringMustContainNumber(2),
      stringMustContainCpecoalCharacter(2),
      minValue(8),
    ],
    value: password.value,
  });
  const classes = useStyles();
  const header = <Typography variant="h5">{t("system:login-pass")}</Typography>;

  // State
  const [open, setOpen] = useState<boolean>(true);

  // Inputs
  const body = (
    <>
      <Input
        {...login}
        {...loginValid}
        className={clsx(classes.field)}
        label={t("system:login")}
      />
      <Input
        {...password}
        {...passwordValid}
        className={classes.field}
        type="password"
        end={
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        }
        label={t("system:password")}
      />
    </>
  );

  // Footer
  const footer = (
    <>
      <Checkbox
        className={classes.choise}
        label="Запомнить пароль"
        position="end"
      />

      <Button size="small" className={classes.btn} onClick={usemodal.openModal}>
        {t("system:save")}
      </Button>
    </>
  );
  const modal = (
    <>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            toggleLoader();
            const res = await api.setting.changeAuthData({
              login: login.value,
              password: password.value,
            });
            enqueueSnackbar(res);
            usemodal.closeModal();
            toggleLoader();
          }}
          fullWidth
        >
          {t("system:yes")}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t("system:no")}
        </Button>
      </div>
    </>
  );
  return (
    <>
      <Card
        className={classes.card}
        header={header}
        bodyProps={{ className: classes.body }}
        body={body}
        footerProps={{ className: classes.footer }}
        footer={footer}
      />
      <Modal className={classes.modal} {...usemodal} children={modal} />
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "loginpass" },
    btn: {
      marginLeft: "auto",
      // width: 360,
      // height: 56,
      // border: `2px solid ${theme.palette.primary.main}`,
      // color: theme.palette.getContrastText(theme.palette.background.paper),
      // marginTop: 24,
      // marginBottom: 24,
      // alignSelf: "center",
      // "&:hover": {
      //   backgroundColor: theme.palette.primary.main,
      //   color: theme.palette.getContrastText(theme.palette.background.paper),
      // },
    },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    field: {
      borderRadius: 40,
      marginBottom: theme.spacing(2),
    },
    modal: { minWidth: 600 },
    body: { flexGrow: 1, justifyContent: "center" },
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    choise: {
      color: theme.palette.primary.main,
    },

    AccessAlarm: {},
    ThreeDRotation: {},
  })
);

export default withAppContext(LoginPass);
