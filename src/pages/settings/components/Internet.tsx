import React, { ChangeEvent, memo, useState } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import {
  useModal,
  useSelect,
  useInput,
  useValidations,
  useResponseSnackbar,
} from "shared/hooks";
import { Card, Modal, EditList } from "shared/components";
import { Typography, Input, Button, Select } from "shared/ui/components";

import { ITheme } from "shared/ui/theme/theme";
import api from "shared/api.old";
import {
  ipString,
  minValue,
  stringMustContainCpecoalCharacter,
  stringMustContainNumber,
} from "shared/utils/validations";
import { SetWanSettingsDTO } from "shared/api.old/setting";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";

interface IWan extends SetWanSettingsDTO {}
interface Props extends IAppContext {
  wan: IWan;
}

const protocols = ["DHCP client", "Unmanaged", "PPPoE", "Static address"];

function Internet({ toggleLoader, wan }: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const { enqueueSnackbar } = useResponseSnackbar();

  const username = useInput(wan?.params?.login ?? "", {
    label: t("settings:username"),
  });
  const usernameValid = useValidations({
    validations: [minValue(5)],
    value: username.value,
  });
  const password = useInput(wan?.params?.password ?? "", {
    label: t("settings:password"),
  });
  const passwordValid = useValidations({
    validations: [
      stringMustContainNumber(2),
      stringMustContainCpecoalCharacter(2),
      minValue(9),
    ],
    value: password.value,
  });

  const [inputs, setInputs] = useState<string[]>([]);

  const gateway = useInput(wan?.params?.gateway ?? "", {
    label: t("settings:gateway"),
  });
  const gatewayValid = useValidations({
    validations: [ipString],
    value: gateway.value,
  });

  const ip = useInput(wan?.params?.ip ?? "", { label: t("settings:ip") });
  const ipValid = useValidations({
    validations: [ipString],
    value: ip.value,
  });
  const mask = useInput(wan?.params?.mask ?? "", {
    label: t("settings:mask"),
  });
  const maskValid = useValidations({
    validations: [ipString],
    value: mask.value,
  });

  const protocolIV =
    (wan &&
      protocols.findIndex((el) => {
        return el.toLocaleLowerCase().includes(wan.state.toLocaleLowerCase());
      })) ??
    0;

  const protocol = useSelect({
    items: protocols.map((protocol, idx) => {
      return { label: protocol, value: idx };
    }),
    selectedValue: protocolIV,
    label: t("settings:protocol"),
  });

  async function saveSettings() {
    let dto: SetWanSettingsDTO = { state: "dhcp", params: {} };
    if (protocols[protocol.value] === "DHCP client") {
    } else if (protocols[protocol.value] === "Unmanaged") {
      dto.state = "um";
    } else if (protocols[protocol.value] === "PPPoE") {
      dto.state = "pppoe";
      dto.params = { login: username.value, password: password.value };
    } else if (protocols[protocol.value] === "Static address") {
      dto.state = "static";
      dto.params = {
        dns: inputs,
        gateway: gateway.value,
        ip: ip.value,
        mask: mask.value,
      };
    }
    await api.setting.setWanSettings(dto);
  }

  const classes = useStyles();
  const header = <Typography variant="h5">{t("settings:ppoe")}</Typography>;
  const pppoe = (
    <>
      <Input className={classes.field} {...username} {...usernameValid} />
      <Input className={classes.field} {...password} {...passwordValid} />
    </>
  );
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
      <Typography className={classes.dns} variant="body2">
        dns
      </Typography>
      <EditList inputs={inputs} setInputs={setInputs} />
    </>
  );
  const body = (
    <>
      <Select className={classes.field} {...protocol} />
      {protocols[protocol.value] === "PPPoE"
        ? pppoe
        : protocols[protocol.value] === "Static address" && staticAddress}
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
    dns: { marginLeft: theme.spacing(2) },
  })
);

export default withAppContext(Internet);
