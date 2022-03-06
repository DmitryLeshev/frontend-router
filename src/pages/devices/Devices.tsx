import React, { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { reflect } from "@effector/reflect";

import { createStyles, makeStyles } from "@material-ui/core";

import { modelDevices } from "entities/device";

import { useGetParameter, useRouter } from "shared/hooks";

import { Page, Placeholder } from "shared/components";
import { Input } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import List from "./components/List";
import { useEffect } from "react";
import { Details } from "./components";

interface Props {
  isLoading: boolean;
}

export enum TypeDevice {
  "unknown" = 0,
  "station" = 1,
  "server" = 2,
  "printer" = 3,
  "router" = 4,
  "ip_telephony" = 5,
  "camera" = 6,
  "tv" = 7,
  "tv_box" = 8,
  "wifi" = 9,
  "phone" = 10,
  "security" = 11,
  "cash" = 12,
  "bluetooth" = 13,
}

export enum DhcpStatusDevice {
  REACHABLE = "REACHABLE",
  PERMANENT = "PERMANENT",
  STALE = "STALE",
  DELAY = "DELAY",
}

export interface ItemDevice {
  id: number;
  name: string;
  ip: string;
  type: TypeDevice;
  mac: string;
  online: number | boolean;
  agent: false;
  os: string;
  isUserOs: false;
  dhcpStatus: DhcpStatusDevice;
  sip: number;
}

function View({}: Props) {
  const { t } = useTranslation();
  const { history } = useRouter();
  const [state, setState] = useState<{ search: string }>({ search: "" });
  const devices = modelDevices.selectors.useDevices();
  const device = modelDevices.selectors.useDevice();

  const id = useGetParameter("id");
  const tab = useGetParameter("tab");

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.currentTarget;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    modelDevices.effects.getDevicesFx();
    return () => {
      modelDevices.events.resetSelectedDevice();
    };
  }, []);

  useEffect(() => {
    modelDevices.events.resetSelectedDevice();
  }, [id]);

  useEffect(() => {
    modelDevices.query.events.setQueryConfig({
      id: Number(id),
      tab: tab ?? "info",
    });
    if (!devices.length || id) return;
    history.push(`devices?id=${devices[0].id}&tab=info`);
  }, [devices, id, tab]);

  const classes = useStyles();
  return (
    <Page title={t("devices:page")}>
      <div className={classes.temlate}>
        <div className={classes.leftbar}>
          <Input
            className={classes.input}
            placeholder={t("devices:list.search")}
            name="search"
            value={state.search}
            onChange={changeHandler}
            fullWidth
          />
          <List list={devices ?? []} />
        </div>
        <div className={classes.content}>
          {!device.details ? (
            <div className={classes.placeholder}>
              <Placeholder placeholder={t("devices:chooseDevice")} />
            </div>
          ) : (
            <Details />
          )}
        </div>
      </div>
    </Page>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    temlate: {
      flexGrow: 1,
      display: "grid",
      gridTemplateAreas: `
        "leftbar content"
      `,
      gridTemplateColumns: "min-content 1fr",
      width: 1224,
      margin: `${theme.spacing(6)}px auto`,
    },
    leftbar: {
      display: "flex",
      flexDirection: "column",
      width: theme.drawer.openWidth + 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      borderRadius: theme.spacing(2),
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    input: { padding: theme.spacing(1.5, 1.5), borderRadius: 40 },
    scroll: { flexGrow: 1 },
    list: { height: 1, flexGrow: 1, overflowY: "auto" },
    item: { overflow: "hidden" },
    active: {
      backgroundColor: theme.palette.action.selected,
      borderRight: `solid 4px ${theme.palette.primary.main}`,
    },
    placeholder: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: theme.spacing(2),
      boxShadow: theme.shadows[3],
      background: theme.palette.background.paper,
      borderRadius: theme.spacing(2),
    },
  })
);

const DevicesPage = reflect({
  view: View,
  bind: {
    isLoading: modelDevices.effects.getDevicesFx.pending,
  },
});

export default DevicesPage;
