import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";

import { model } from "features/backdrop-ping-status";

import { Card } from "shared/components";
import { _trDate } from "shared/utils";
import { Typography, Button, Select } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { useResponseSnackbar, useSelect } from "shared/hooks";
import { withAppContext } from "shared/hocs";
import { IAppContext } from "shared/contexts/app";
import api from "shared/api.old";
import { IDataSettingIndex } from "shared/api.old/update";
import apiOld from "shared/api.old";
import clsx from "clsx";

interface Props extends IAppContext {}

const UPDATE = {
  "update-avaible": "доступно обновление",
  "update-notneed": "самая новая версия",
  "update-license-error": "истекла лицензия",
};

const initialState: IDataSettingIndex = {
  downloaded: false,
  downloading: "auto",
  updating: "auto",
  version: "1.0.1",
  "update-settings": {
    times: [6, 7],
    updating: "auto",
  },
};

enum SelectItems {
  auto,
  man,
}

const TIMES: { [time: number]: [number, number] } = {
  0: [0, 1],
  6: [6, 7],
  18: [18, 19],
  12: [12, 13],
};

function Update({ toggleLoader }: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [data, setData] = useState<IDataSettingIndex>(initialState);
  const [manualData, setManualData] = useState<{ version: String } | null>(
    null
  );
  const [lastVersion, setLastVersion] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdateManual, setIsUpdateManual] = useState<boolean>(false);
  const [update] = useState<string>(`05.09.2021`);

  const typeUpdate = useSelect({
    selectedValue: SelectItems[data["update-settings"]?.updating ?? "auto"],
    items: [
      { value: 0, label: "Автоматическое" },
      { value: 1, label: "Ручное" },
    ],
  });

  const timeSelection = useSelect({
    selectedValue: data?.["update-settings"]?.times?.[0] ?? 6,
    label: "Время обновления",
    items: [
      { value: 6, label: "6:00 - 7:00" },
      { value: 12, label: "12:00 - 13:00" },
      { value: 18, label: "18:00 - 19:00" },
      { value: 0, label: "00:00 - 01:00" },
    ],
  });

  async function getData() {
    const { data } = await api.update.index();
    console.log({ data });
    if (data) setData(data);
  }

  React.useEffect(() => {
    getData();
  }, []);

  const header = (
    <Typography variant="h5">
      {t("system:version-system")}: {data.version}
    </Typography>
  );
  const body = (
    <>
      <Select className={classes.row} {...typeUpdate} />
      {typeUpdate.value === 0 && (
        <Select className={classes.row} {...timeSelection} />
      )}

      {typeUpdate.value === 1 && (
        <>
          <Button
            className={clsx(classes.row, classes.checkManual)}
            onClick={async () => {
              setLastVersion(false);
              setManualData(null);
              setLoading(true);
              const res = await apiOld.update.checkUpdateManually();
              console.log({ res });
              if (res?.data?.version)
                setManualData({ version: res.data.version });
              else setLastVersion(true);
              setLoading(false);
            }}
          >
            Проверить обновление
            {loading && (
              <div className={classes.loader}>
                <CircularProgress size={20} />
              </div>
            )}
          </Button>
        </>
      )}

      {typeUpdate.value === 1 && lastVersion && (
        <>
          <Typography className={classes.row}>
            У вас установлена последняя версия
          </Typography>
        </>
      )}

      {typeUpdate.value === 1 && manualData && (
        <>
          <Typography className={classes.row}>
            Доступна версия: {manualData?.version}
          </Typography>
        </>
      )}

      {typeUpdate.value === 1 && manualData && (
        <>
          <Button
            onClick={async () => {
              setIsUpdateManual(true);
              const res = await apiOld.update.updateManually();
              setIsUpdateManual(false);
              await model.run();
            }}
          >
            Обновить
            {isUpdateManual && (
              <div className={classes.loader}>
                <CircularProgress size={20} />
              </div>
            )}
          </Button>
        </>
      )}
    </>
  );
  const footer = (
    <>
      <Typography variant="body1" color="textSecondary">
        {t("system:renewal")} {update}
      </Typography>
      <Button
        className={classes.save}
        onClick={async () => {
          let dto: {
            times?: [number, number];
            updating: "man" | "auto";
          } = {
            updating: typeUpdate.value === 1 ? "man" : "auto",
          };
          if (typeUpdate.value === 0) {
            dto.times = TIMES?.[timeSelection.value] ?? [6, 7];
          }
          const res = await apiOld.update.changeUpdateSettings(dto);
          console.log(res);
        }}
      >
        Сохранить
      </Button>
    </>
  );

  return (
    <Card
      className={classes.card}
      header={header}
      bodyProps={{ className: classes.body }}
      body={body}
      footer={footer}
      footerProps={{ className: classes.footer }}
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    body: {},
    card: {},
    btn: { marginLeft: "auto" },
    formControl: {},
    mr_r2: { marginRight: theme.spacing(2) },
    item: {},
    key: { display: "flex", alignItems: "center" },
    keySecondary: { marginTop: theme.spacing(2) },
    row: { marginBottom: theme.spacing(2) },
    footer: { alignItems: "center", justifyContent: "space-between" },
    save: { marginLeft: theme.spacing(2) },
    loader: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      right: 16,
    },
    checkManual: { position: "relative" },
  })
);

export default withAppContext(Update);
