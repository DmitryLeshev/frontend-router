import React, { memo } from "react";

import { useModal, useInput, useResponseSnackbar } from "shared/hooks";
import { Card, Modal } from "shared/components";
import { Typography, Button, Input } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { AnketaDTO } from "shared/api.old/server";
import api from "shared/api.old";
import { useEffect } from "react";
import { RssFeedIcon } from "shared/assets/icons";
import {
  minValue,
  maxLength,
  notCpecoalCharacter,
  required,
} from "shared/utils/validations";
import { setTimeout } from "timers";
import clsx from "clsx";

interface Props {}

interface IInputs {
  name: string;
  value: string;
  className: string;
  type: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const keyValidation = [
  minValue(16),
  maxLength(16),
  notCpecoalCharacter,
  required,
];

export default memo(function Connection({}: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useResponseSnackbar();
  const usemodal = useModal();

  const [keyError, setKeyError] = React.useState<boolean>(false);

  const domain = useInput("", {
    label: t(`system:domain`),
    validations: [required],
  });
  const key = useInput("", {
    label: t(`system:key-label`),
    validations: keyValidation,
  });

  const [anketa, setAnketa] = React.useState<IInputs[] | null>(null);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAnketa((prev) => {
      if (!prev) return null;
      const inputs = prev.map((input) => {
        if (input.name === name) {
          input.value = value;
        }
        return input;
      });
      return inputs;
    });
  }

  async function loadAnketa() {
    console.log("loadAnketa");
    const res = await api.server.registration({
      domain: domain.value,
      init_key: key.value,
    });

    if (typeof res.data === "string") {
      console.log(res.data);
      if (res.data === "Wrong init key") setKeyError(true);
      if (res.data === "connection-error") return;
      return;
    }
    const inputs = res?.data?.map((field) => {
      return {
        name: field.name,
        value: field.value
          ? field.value
          : field.type === "date"
          ? "1999-01-01"
          : "",
        className: classes.input,
        type: field.type ?? "text",
        label: field.title,
        onChange,
      };
    });
    setAnketa(inputs ?? null);
  }

  async function saveAnketa() {
    const dto: AnketaDTO = {
      anketa:
        anketa?.map((input) => {
          const { name, value, type, label } = input;
          return { name, title: label, type, value };
        }) ?? [],
    };
    await api.server.anketa(dto);
    setAnketa(null);
    usemodal.closeModal();
    await getConnected();
  }

  async function getConnected() {
    api.main.isServerConnected().then((res: any) => {
      setIsConnected(res.msg);
    });
  }

  async function disconnect() {
    const res = await api.server.disconnect();
    enqueueSnackbar(res);
    // TEST
    return await getConnected();
  }

  useEffect(() => {
    getConnected();
  }, []);

  useEffect(() => {
    if (!keyError) return;
    const timeout = setTimeout(() => {
      setKeyError(false);
      clearTimeout(timeout);
    }, 5000);
  }, [keyError]);

  const header = <Typography variant="h5">{t("system:connection")}</Typography>;

  const RenderDisconnect = (
    <>
      <Card
        className={classes.modal_card}
        header={
          <Typography variant="h4">{t("system:you-are-sure")}</Typography>
        }
        footer={
          <>
            <Button
              className={classes.btn}
              onClick={async () => {
                await disconnect();
                usemodal.closeModal();
              }}
            >
              {t(`system:yes`)}
            </Button>
            <Button className={classes.btn} onClick={usemodal.closeModal}>
              {t(`system:no`)}
            </Button>
          </>
        }
      />
    </>
  );

  const RenderKey = (
    <>
      <Card
        className={classes.modal_card}
        header={<Typography variant="h4">{t("system:key")}</Typography>}
        body={
          <>
            <Input autoFocus className={classes.input} {...domain} fullWidth />
            <Input className={classes.input} {...key} fullWidth />
          </>
        }
        footer={
          <>
            <Typography
              className={clsx(classes.wrong_key, {
                [classes.wrong_key_show]: keyError,
              })}
            >
              {t(`system:wrong-init-key`)}
            </Typography>
            <Button
              disabled={Boolean(domain.error) || Boolean(key.error)}
              className={classes.btn}
              onClick={loadAnketa}
            >
              {t(`system:send`)}
            </Button>
          </>
        }
      />
    </>
  );

  const RenderAnketa = (
    <>
      <Card
        className={classes.modal_card}
        header={<Typography variant="h4">{t("system:anketa")}</Typography>}
        body={anketa?.map((input, idx) => {
          return <Input key={idx} {...input} />;
        })}
        footer={
          <Button
            className={classes.btn}
            onClick={saveAnketa}
            disabled={anketa?.some((el) => !el.value)}
          >
            {t(`system:send`)}
          </Button>
        }
      />
    </>
  );

  const modal = isConnected
    ? RenderDisconnect
    : anketa
    ? RenderAnketa
    : RenderKey;

  return (
    <>
      <Button
        color="primary"
        onClick={async () => {
          usemodal.openModal();
        }}
      >
        <div className={classes.card2}>
          <RssFeedIcon className={classes.icon} />
          <Typography variant="h6">
            {!isConnected ? t("system:connect") : t("system:disconnect")}
          </Typography>
        </div>
      </Button>
      {/* <Card header={header} footer={footer} /> */}
      <Modal className={classes.modal} {...usemodal} children={modal} />
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "reboot" },
    btn: {
      marginLeft: theme.spacing(2),
      "&:first-child": { marginLeft: "auto" },
    },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    // modal: { minWidth: 800, display: "flex", flexDirection: "column" },
    modal: { padding: 0, background: "inherit" },
    input: { marginBottom: theme.spacing(2) },
    card2: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      // width: 198,
      // height: 176,
    },
    icon: { width: 32, height: 32 },
    modal_card: {
      minWidth: 400,
      backgroundColor: theme.palette.background.default,
    },
    wrong_key: {
      marginRight: "auto",
      color: theme.palette.error.main,
      opacity: 0,
      transition: "all  0.3s",
    },
    wrong_key_show: { opacity: 1 },
  })
);
