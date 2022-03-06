import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import {
  useValidations,
  useModal,
  useInput,
  useResponseSnackbar,
} from "shared/hooks";
import { Card, Modal, EditList } from "shared/components";
import { Typography, Input, Button } from "shared/ui/components";

import { ITheme } from "shared/ui/theme/theme";
import { ResGetDHCP, SetLanSettingsDTO } from "shared/api.old/setting";

import { ipString } from "shared/utils/validations";
import api from "shared/api.old";
import { IAppContext } from "shared/contexts/app";
import { withAppContext } from "shared/hocs";
import clsx from "clsx";

interface ILan {
  dns: string[];
  gateway: string;
  ip: string;
  mask: string;
}

interface Props extends IAppContext {
  lan: ILan;
}

function Local({ toggleLoader, lan }: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const { enqueueSnackbar } = useResponseSnackbar();
  const [inputs, setInputs] = useState<string[]>(lan?.dns ?? []);

  const [dhcp, setDhcp] = useState<ResGetDHCP | null>(null);

  const gateway = useInput(lan?.gateway ?? "", {
    label: t("settings:gateway"),
  });
  const gatewayValid = useValidations({
    validations: [ipString],
    value: gateway.value,
  });

  const ip = useInput(lan?.ip ?? "", { label: t("settings:ip") });
  const ipValid = useValidations({
    validations: [ipString],
    value: ip.value,
  });
  const mask = useInput(lan?.mask ?? "", { label: t("settings:mask") });
  const maskValid = useValidations({
    validations: [ipString],
    value: mask.value,
  });

  const dhcpFrom = useInput(String(dhcp?.min), {
    label: t("settings:dhcp-from"),
    start: dhcp?.ip,
  });
  const dhcpBy = useInput(String(dhcp?.max), {
    label: t("settings:dhcp-by"),
    start: dhcp?.ip,
  });

  async function saveSettings() {
    const dto: SetLanSettingsDTO = {
      dns: inputs,
      gateway: gateway.value,
      ip: ip.value,
      mask: mask.value,
    };
    Promise.all([
      api.setting.setLanSettings(dto),
      api.setting.changeDHCP({
        min: Number(dhcpFrom.value),
        max: Number(dhcpBy.value),
      }),
    ]);
  }

  async function getDhcp() {
    const res = await api.setting.getDHCP();
    setDhcp(res.data ?? null);
  }

  React.useEffect(() => {
    getDhcp();
  }, []);

  const classes = useStyles();
  const header = <Typography variant="h5">{t("settings:ahcp")}</Typography>;
  const staticAddress = (
    <>
      <Input
        placeholder="192.168.1.1 (wan)"
        className={classes.field}
        {...gateway}
        {...gatewayValid}
      />
      <Input
        placeholder="192.168.2.255"
        className={classes.field}
        {...ip}
        {...ipValid}
      />
      <Input
        placeholder="255.255.255.0"
        className={classes.field}
        {...mask}
        {...maskValid}
      />
      <Typography
        className={clsx(classes.dns, classes.field_low)}
        variant="body2"
      >
        DHCP
      </Typography>
      <Input className={classes.field} {...dhcpFrom} type="number" />
      <Input className={classes.field} {...dhcpBy} type="number" />
      <Typography
        className={clsx(classes.dns, classes.field_low)}
        variant="body2"
      >
        DNS
      </Typography>
      <EditList inputs={inputs} setInputs={setInputs} />
    </>
  );

  const body = staticAddress;

  const footer = (
    <Button
      className={classes.btn}
      onClick={usemodal.openModal}
      color="primary"
      size="large"
    >
      {t("settings:save")}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t("settings:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            usemodal.closeModal();
            await saveSettings();
          }}
          fullWidth
        >
          {t("settings:yes")}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t("settings:no")}
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Card
        header={header}
        body={body}
        footerProps={{ className: classes.footer }}
        footer={footer}
      />
      <Modal {...usemodal} children={modal} />
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "reboot" },
    footer: { alignItems: "center", justifyContent: "center" },
    btn: { borderRadius: theme.spacing(3), width: 360 },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    field: { marginBottom: theme.spacing(2) },
    field_low: { marginBottom: theme.spacing(1) },
    dns: { marginLeft: theme.spacing(1.5) },
  })
);

export default withAppContext(Local);
