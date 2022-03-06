import { Typography, Button, ListItem, List } from "shared/ui/components";

import { cubicApi } from "shared/api";
import { makeStyles, createStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useRef, useState } from "react";
import { Card } from "shared/components";
import { useTranslation } from "react-i18next";
import { TypeOpenVPN } from "shared/api/cubic/setting";

function errorHandler(evt: any) {
  console.log("errorHandler", evt);
  switch (evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      console.log("File Not Found!");
      break;
    case evt.target.error.NOT_READABLE_ERR:
      console.log("File is not readable");
      break;
    case evt.target.error.ABORT_ERR:
      break; // noop
    default:
      console.log("An error occurred reading this file.");
  }
}

const VpnClinet = () => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<TypeOpenVPN>("config");
  const { t } = useTranslation();

  function loadFile(type: TypeOpenVPN) {
    return () => {
      setType(type);
      inputRef.current?.click();
    };
  }

  const handlerChange =
    (type: TypeOpenVPN) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      const files = e.target.files;
      Array.from(files).forEach(async (file) => {
        console.log({ file });
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onerror = errorHandler;
        reader.onload = (e) => {
          if (!e.target?.result) return;
          if (typeof e.target.result === "string") {
            console.log({ e: e.target.result });
            cubicApi.setting.uploadConfigOpenVPN({
              file: e.target.result,
              type,
            });
          }
        };
      });
    };

  const header = <Typography variant="h5">{t("VPN Clinet")}</Typography>;

  const body = (
    <>
      <Typography variant="body1">
        Пути для конфигурации сертификатов:
      </Typography>
      <List>
        <ListItem>/etc/openvpn/remoteclient/ca.crt</ListItem>
        <ListItem>/etc/openvpn/remoteclient/client.crt</ListItem>
        <ListItem>/etc/openvpn/remoteclient/client.key</ListItem>
      </List>
    </>
  );

  const footer = (
    <>
      <Button onClick={loadFile("config")} color="primary" size="large">
        {t("settings:Загрузить на сервер конфигурацию")}
      </Button>
      <Button onClick={loadFile("ca")} color="primary" size="large">
        {t("settings:Загрузить сертифиакат цента сертификации")}
      </Button>
      <Button onClick={loadFile("cert")} color="primary" size="large">
        {t("settings:Загрузить клиетский сертификат")}
      </Button>
      <Button onClick={loadFile("key")} color="primary" size="large">
        {t("settings:Загрузить клиетский ключ")}
      </Button>
      <input
        className={classes.file}
        ref={inputRef}
        id="file"
        type="file"
        accept={"*"}
        onChange={handlerChange(type)}
      />
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
    </>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    btns: { display: "flex", gap: theme.spacing(2) },
    file: {
      display: "none",
    },
    card: {},
    footer: {
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: theme.spacing(2),
    },
    btn: { borderRadius: theme.spacing(3), width: 360 },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      gap: theme.spacing(4),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    field: { marginBottom: theme.spacing(2) },
    modal: { width: 400 },
  })
);

export default VpnClinet;
