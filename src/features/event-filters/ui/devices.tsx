import { reflect } from "@effector/reflect";
import { createStyles, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeviceIcon } from "shared/components";
import { useSelect } from "shared/hooks";
import { Select, Typography } from "shared/ui/components";
import { IItemMenu } from "shared/ui/components/Select";
import { ITheme } from "shared/ui/theme/theme";

import { modelEvent } from "entities/event";
import { cubicApi } from "shared/api";
import { useGate } from "effector-react";
import { actions } from "../model";

interface IDevice {
  entityId: number;
  entityType: number;
  ip: string;
  name: string;
  typeId: number;
}

type Props = {};

function View({}: Props) {
  useGate(modelEvent.devicesGates.devicesGate);
  const classes = useStyles();
  const devices = modelEvent.devicesSelectors.useDevices();
  const setSearch = modelEvent.queryEvents.updateQueryConfig;
  const [value, setValue] = useState<number>(0);
  const [items, setItems] = useState<IItemMenu[]>([]);

  const { t } = useTranslation();

  const select = useSelect({
    selectedValue: value ?? 0,
    items: [
      {
        label: (
          <div className={classes.item}>
            <DeviceIcon className={classes.icon} type={0} />
            <Typography>{t(`common:filter.all`)}</Typography>
          </div>
        ),
        value: 0,
      },
      ...items,
    ],
    label: t(`common:filter.devices`),
  });

  function getItems() {
    const items = devices.map((item, idx: number) => {
      return {
        label: (
          <div className={classes.item}>
            <DeviceIcon className={classes.icon} type={item.entityType} />
            <Typography>{item.name}</Typography>
          </div>
        ),
        value: idx + 1,
      };
    });
    setItems(items);
  }

  useEffect(() => {
    getItems();
  }, [devices]);

  useEffect(() => {
    const item = devices[select.value - 1];

    if (!item) {
      actions.filterOnChange({ key: "device", value: {} });
      return setSearch({ devices: [] });
    }
    actions.filterOnChange({
      key: "device",
      value: { entityId: item.entityId, entityType: item.entityType },
    });
    setSearch({
      devices: [{ entityId: item.entityId, entityType: item.entityType }],
    });
  }, [select.value]);

  actions.filterReset.watch(() => {
    select.reset();
  });

  return (
    <div className={classes.wrapper}>
      <Select fullWidth {...select} />
    </div>
  );
}

export const EventDevices = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    item: { display: "flex", alignItems: "center" },
    icon: { marginRight: theme.spacing(1) },
    wrapper: { marginBottom: theme.spacing(3), width: "100%" },
  })
);
