import React, { memo } from "react";

import { useModal, useRouter } from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { RefreshIcon } from "shared/assets/icons";
import CardAction from "./Card";
import api from "api.old";
import { CALL_TIMEOUT } from "./Reboot";
import { modelLoader } from "processes/loader";
import { modelAuthCheck } from "processes/auth";

interface Props {}

function CustomModal({ reset, usemodal }: any) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Modal className={classes.modal} {...usemodal}>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            await reset();
            usemodal.closeModal();
          }}
          fullWidth
        >
          {t("system:yes")}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t("system:no")}
        </Button>
      </div>
    </Modal>
  );
}

function ResetV2(props: any) {
  const classes = useStyles();
  const { t } = useTranslation();

  const usemodal = useModal();

  return (
    <>
      <Button
        className={classes.WrapperBtn}
        color="primary"
        onClick={usemodal.openModal}
      >
        <div className={classes.card2}>
          <RefreshIcon className={classes.icon} />
          <Typography variant="h5">{t("system:reset")}</Typography>
        </div>
      </Button>
      <CustomModal usemodal={usemodal} reset={props.reset} />
    </>
  );
}

function Reset({ reset }: any) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const classes = useStyles();

  const header = (
    <Typography variant="h5">{t("system:system-reset")}</Typography>
  );
  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t("system:reset")}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            await reset();
            usemodal.closeModal();
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
      <Card header={header} footer={footer} />
      <Modal className={classes.modal} {...usemodal} children={modal} />
    </>
  );
}

function Resetv3({}: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  async function isConnected() {
    try {
      const res = await api.auth.status();
      console.log("res", res);
      if (res instanceof Error) {
        throw new Error();
      }
      return res;
    } catch (error) {
      return await ping();
    }
  }

  async function ping() {
    return new Promise((resolve) => {
      const timeout = setTimeout(async () => {
        clearTimeout(timeout);
        resolve(await isConnected());
      }, CALL_TIMEOUT);
    });
  }

  async function reset() {
    modelLoader.actions.toggleLoader();
    await api.setting.reset();
    await ping();
    modelAuthCheck.actions.check();
    modelLoader.actions.toggleLoader();
  }

  return (
    <CardAction
      action={reset}
      className={classes.card}
      label={t("system:reset")}
      icon={RefreshIcon}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { flexGrow: 1 },
    btn: { marginLeft: "auto" },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    modal: { minWidth: 600 },
    card2: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 198,
      height: 176,
    },
    icon: { width: 84, height: 84, marginBottom: theme.spacing(1) },
    WrapperBtn: {},
  })
);

export default Resetv3;
