import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core";

import { modelDevices } from "entities/device";

import { useInput, useSelect, useActions, useGetParameter } from "shared/hooks";
import { Card, Table, Enumeration, DeviceIcon } from "shared/components";
import {
  Typography,
  Button,
  Input,
  IconButton,
  Select,
  Avatar,
} from "shared/ui/components";

import { CreateIcon } from "shared/assets/icons";
import { DD_MM_YYYY, transformDate } from "shared/utils/transformDate";
import { bytesToSize, declOfNum, downloadAgent } from "shared/utils";

import { ITheme } from "shared/ui/theme/theme";
import { EnumerationItem } from "shared/components/Enumeration/Enumeration";

export const DeviceTypeName: any = {
  0: "unknown",
  1: "station",
  2: "server",
  3: "printer",
  4: "router",
  5: "ip_telephony",
  6: "camera",
  7: "tv",
  8: "tv_box",
  9: "wifi",
  10: "phone",
  11: "security",
  12: "cash",
  13: "bluetooth",
};

export const CardAgent = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <Card
      header={
        <Typography variant="h4">{t(`devices:info.agent.title`)}</Typography>
      }
      footer={
        <Button className={classes.btn_right} onClick={downloadAgent}>
          {t(`devices:info.agent.download-agent`)}
        </Button>
      }
    />
  );
};

interface PropsCardPorts {
  data: any;
}
export const CardPorts = ({ data }: PropsCardPorts) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Card
      className={classes.ports}
      header={
        <Typography variant="h4">{t(`devices:info.ports.title`)}</Typography>
      }
      body={
        <>
          <Table
            columns={[
              {
                headerName: t("devices:info.number"),
                field: "number",
                width: "33%",
              },
              {
                headerName: t("devices:info.type"),
                field: "type",
                width: "33%",
              },
              {
                headerName: t("devices:info.protocol"),
                field: "protocol",
                width: "34%",
              },
              {
                headerName: t("devices:info.banner"),
                field: "banner",
                width: "34%",
              },
            ]}
            rows={data ?? []}
          />
        </>
      }
    />
  );
};

interface PropsCardResume {
  data: any;
  isRouter: boolean;
}
export const CardResume = ({ data, isRouter }: PropsCardResume) => {
  const classes = useStyles();
  const id = useGetParameter("id");
  const { t } = useTranslation();
  const fetchDevices = () => console.log("qwe");
  const [edit, setEdit] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const selectItems = Object.entries(DeviceTypeName).map(([value, label]) => {
    return { value: Number(value), label: t(`device_type.${String(label)}`) };
  });

  const select = useSelect({ items: selectItems, selectedValue: deviceType });

  async function save() {
    modelDevices.effects.updateDeviceFx({
      id: Number(id),
      name: name,
      type: select.value,
    });
    // await api.device.setNewResume({
    //   id: Number(id),
    //   name: name,
    //   type: select.value,
    // });
    fetchDevices();
    setEdit((prev) => !prev);
  }

  React.useEffect(() => {
    if (!data) return;
    const type = data.type;
    setDeviceType(type);
    setName(data.name ?? "");
  }, [data]);

  React.useEffect(() => {
    setEdit(false);
  }, [id]);

  const type = (edit: boolean) => {
    if (edit) {
      return <Select {...select} />;
    } else {
      return (
        <div className={classes.value}>
          <DeviceIcon type={select.value} />
          <Typography>
            {t(`device_type.${DeviceTypeName[select.value]}`)}
          </Typography>
        </div>
      );
    }
  };

  const enumerationItems: EnumerationItem[] = [
    {
      key: t(`devices:info.name`),
      value: edit ? (
        <Input
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
      ) : (
        name
      ),
    },
    { key: t(`devices:info.type`), value: type(edit) },
    { key: t(`devices:info.os`), value: data?.os ?? "" },
  ];

  return (
    <Card
      header={
        <>
          <Typography variant="h4">{t(`devices:info.resume.title`)}</Typography>
          {!isRouter && (
            <IconButton
              className={classes.icon}
              onClick={() => setEdit((prev) => !prev)}
            >
              <CreateIcon />
            </IconButton>
          )}
        </>
      }
      body={<Enumeration items={enumerationItems} />}
      footer={
        edit && (
          <Button className={classes.btn_right} onClick={save}>
            {t("common:save")}
          </Button>
        )
      }
    />
  );
};

interface PropsCardUsb {
  data: any;
}
export const CardUsb = ({ data }: PropsCardUsb) => {
  const { t } = useTranslation();

  const enumerationItems = data.map((el: any) => {
    return { key: el.name, keySeconday: el.location };
  });

  return (
    <Card
      header={
        <Typography variant="h4">{t(`devices:info.usb.title`)}</Typography>
      }
      body={<Enumeration items={enumerationItems} />}
    />
  );
};

interface PropsCardMain {
  data: any;
}
export const CardMain = ({ data }: PropsCardMain) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const enumerationItems = [
    {
      key: t("devices:info.os"),
      value: data?.os,
      valueSeconday: `Установленно ${transformDate(
        data?.dateInst,
        DD_MM_YYYY
      )}`,
    },
    { key: t("devices:info.domain"), value: data?.machineName },
    { key: t("devices:info.host"), value: data?.hostname },
    {
      key: t("devices:info.manufacturer"),
      value: (
        <Typography className={classes.eclipse} noWrap>
          {data?.vendor + data?.model}
        </Typography>
      ),
    },
  ];

  return (
    <Card
      header={
        <Typography variant="h4">{t(`devices:info.main.title`)}</Typography>
      }
      body={<Enumeration items={enumerationItems} />}
    />
  );
};

interface PropsCardEquipment {
  data: any;
}
export const CardEquipment = ({ data }: PropsCardEquipment) => {
  const classes = useStyles();
  const { processorsInfo, videoInfo, physicalDrives, totalRAM, ramInfo } = data;
  const { t } = useTranslation();

  const enumerationItems = () => {
    const cpu =
      processorsInfo?.length > 0
        ? processorsInfo.map((el: any) => {
            return { key: t("devices:info.cpu"), value: el?.Name };
          })
        : [];
    const ozu = {
      key: t("devices:info.ozu"),
      value: bytesToSize(totalRAM * 1000),
      valueSeconday:
        ramInfo?.length > 0 &&
        `${ramInfo.length} ${declOfNum(ramInfo.length, [
          "СЛОТ",
          "СЛОТА",
          "СЛОТОВ",
        ])} ` + ramInfo.map((el: any) => bytesToSize(el.Capacity)).join(" + "),
    };
    const video =
      videoInfo?.length > 0
        ? videoInfo.map((el: any) => {
            return {
              key: t("devices:info.videoSystem"),
              value: el?.Name,
              valueSeconday: bytesToSize(el?.AdapterRAM),
            };
          })
        : [];
    const storage =
      physicalDrives?.length > 0
        ? physicalDrives.map((el: any) => {
            return {
              key: t("devices:info.storageDevice"),
              value: el?.Model,
              valueSeconday: bytesToSize(el?.Size),
            };
          })
        : [];
    return [...cpu, ozu, ...video, ...storage];
  };

  return (
    <Card
      header={
        <Typography variant="h4">
          {t(`devices:info.equipment.title`)}
        </Typography>
      }
      body={<Enumeration items={enumerationItems()} />}
    />
  );
};

interface PropsCardUsers {
  data: any;
}
export const CardUsers = ({ data }: PropsCardUsers) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card
      header={
        <Typography variant="h4">{t(`devices:info.users.title`)}</Typography>
      }
      body={
        data?.length > 0 &&
        data.map((el: any, idx: number) => {
          return (
            <div className={classes.user} key={idx}>
              <Avatar className={classes.ava} base64={el?.avatar} />
              <Typography varinat="h5">{el?.login}</Typography>
            </div>
          );
        })
      }
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    icon: { marginLeft: "auto" },
    btn: { marginRight: theme.spacing(2), "&:last-child": { marginRight: 0 } },
    value: { display: "flex", "& > p": { marginLeft: theme.spacing(2) } },
    ports: { gridColumn: "1/2" },
    user: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(2),
      "&:last-child": { marginBottom: 0 },
    },
    ava: { marginRight: theme.spacing(2) },
    btn_right: { marginLeft: "auto" },
    footer_animation_start: { opacity: 0 },
    footer_animation_end: { opacity: 1 },
    agent: { gridArea: "agent" },
    eclipse: { maxWidth: 150 },
  })
);
