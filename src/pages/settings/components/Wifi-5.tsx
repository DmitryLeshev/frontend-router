import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  useInput,
  useModal,
  useResponseSnackbar,
  useSelect,
} from "shared/hooks";
import { Card, Modal } from "shared/components";
import {
  Typography,
  Button,
  Input,
  Select,
  IconButton,
} from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { SettingWifiDTO } from "shared/api.old/setting";
import api from "shared/api.old";
import useValidations from "shared/hooks/useValidations";
import {
  minValue,
  stringMustContainNumber,
  stringMustContainCpecoalCharacter,
  wifiPasswordValidations,
} from "shared/utils/validations";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";
import { Visibility, VisibilityOff } from "shared/assets/icons";

const canals = [
  34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 100, 104, 108,
  112, 116, 120, 124, 128, 132, 136, 140, 147, 149, 150, 152, 153, 155, 157,
  159, 160, 161, 163, 165, 167, 171, 173, 177, 180,
];

export interface ISetting {
  channel: number;
  password: string;
  ssid: string;
  width: number;
}

interface Props extends IAppContext {
  settings: {
    5: ISetting;
  };
}

function Wifi5({ toggleLoader, settings }: Props) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useResponseSnackbar();
  const usemodal = useModal();
  const [show, setShow] = useState<boolean>(false);
  const essid = useInput(settings?.[5]?.ssid ?? "", {
    name: "essid",
    label: t("settings:essid"),
  });
  const eesidValid = useValidations({
    validations: [minValue(1)],
    value: essid.value,
  });
  const password = useInput(settings?.[5]?.password ?? "", {
    name: "passwd",
    label: t("settings:password"),
    end: (
      <IconButton onClick={() => setShow((prev) => !prev)}>
        {show ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    ),
  });
  const passwordValid = useValidations({
    validations: wifiPasswordValidations,
    value: password.value,
  });
  const width = useSelect({
    items: [
      { value: 20, label: "20 Mhz" },
      { value: 40, label: "40 Mhz" },
      { value: 80, label: "80 Mhz" },
    ],
    selectedValue: settings?.[5]?.width ?? 20,
    label: t("settings:width"),
  });

  const canal5 = useSelect({
    items: canals.map((canal) => {
      return { label: String(canal), value: canal };
    }),
    selectedValue: settings?.[5]?.channel ?? 34,
    label: t("settings:canal"),
  });

  async function saveSettings() {
    const dto: SettingWifiDTO = {
      range: "5",
      essid: essid.value,
      passwd: password.value,
      channel: Number(canal5.value),
      width: Number(width.value),
    };
    await api.setting.settingWifi(dto);
  }

  const classes = useStyles();
  const header = <Typography variant="h5">{t("settings:wifi-5")}</Typography>;
  const body = (
    <>
      <Input className={classes.field} {...essid} {...eesidValid} />
      <Input
        className={classes.field}
        {...password}
        {...passwordValid}
        type={show ? "text" : "password"}
      />
      <Select className={classes.field} {...canal5} />
      <Select className={classes.field} {...width} />
    </>
  );
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
        className={classes.card}
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
    card: { width: 400 },
    footer: { alignItems: "center", justifyContent: "center" },
    btn: { borderRadius: theme.spacing(3), width: 360 },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    field: { marginBottom: theme.spacing(2) },
  })
);

export default withAppContext(Wifi5);
