import React, { memo, useState } from "react";

import { useModal } from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import CardAction from "./Card";
import { CachedIcon } from "shared/assets/icons";
import api from "shared/api.old";

import { modelLoader } from "processes/loader";
import { modelAuthCheck } from "processes/auth";

export const CALL_TIMEOUT = 20 * 1000;

interface Props {}

function Reboot({ reboot }: any) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const classes = useStyles();

  const header = (
    <Typography variant="h5">{t("system:reboot-reset")}</Typography>
  );

  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t("system:reboot")}
    </Button>
  );

  const modal = (
    <>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            await reboot();
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
function RebootV2({}: Props) {
  const classes = useStyles();
  const { t } = useTranslation();

  async function isConnected() {
    try {
      const res = await api.auth.status();
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

  async function reboot() {
    modelLoader.actions.toggleLoader();
    await api.setting.reboot();
    await ping();
    modelAuthCheck.actions.check();
    modelLoader.actions.toggleLoader();
  }

  return (
    <CardAction
      action={reboot}
      className={classes.card}
      label={t("system:reboot")}
      icon={CachedIcon}
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
  })
);

export default RebootV2;
