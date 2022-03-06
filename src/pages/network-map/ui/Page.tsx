import { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import clsx from "clsx";

import { Page } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";
import { Backdrop } from "shared/ui/components";

import { Device, Router as RouterType } from "../model";

import {
  Arrow,
  InternateItem,
  NetworkMapList,
  Router,
  VPN,
  WIFIItem,
  Network,
} from "./components";

type Props = {
  ethernet: Device[];
  wifi: Device[];
  router: RouterType;
};
const View: React.FC<Props> = ({ wifi, ethernet, router }) => {
  const classes = useStyles();

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  const [selectedPort, setSelectedPort] = useState<number | null>(null);

  const [pointItem, setPointItem] = useState<DOMRect | null>(null);
  const [pointDevice, setPointDevice] = useState<DOMRect | null>(null);

  const [backdrop, setBackdrop] = useState<boolean>(false);
  const toggleBackdrop = () => setBackdrop((state) => !state);

  function removeSelectedItem() {
    setSelectedItem(null);
    setSelectedDevice(null);
    setPointItem(null);
    setPointDevice(null);
    setSelectedPort(null);
    toggleBackdrop();
  }

  function selectItem(
    setId: (value: React.SetStateAction<number | null>) => void,
    setPoint: (value: React.SetStateAction<DOMRect | null>) => void
  ) {
    return (id: number) => {
      return (ref: React.RefObject<HTMLLIElement>) => {
        const element = ref.current?.getBoundingClientRect();
        element && setPoint(element);
        setId(id);
        // toggleBackdrop();
      };
    };
  }

  useEffect(() => {
    const isSelected = !!pointItem && !!pointDevice;
    if (isSelected) toggleBackdrop();
  }, [pointItem, pointDevice]);

  useEffect(() => {
    const selectedPort = router.external.ports.find(
      (port) => port.port === selectedItem
    );

    const devices = [...wifi, ...ethernet];

    const selectedDevice = devices.find(
      (device) => device.id === selectedPort?.deviceId
    );

    if (selectedDevice) {
      setSelectedDevice(selectedDevice.id);
      setSelectedPort(selectedPort?.devicePort ?? null);
    }
  }, [selectedItem]);

  const isSelected = !!pointItem && !!pointDevice;

  console.log({ selectedItem, selectedDevice, selectedPort });

  return (
    <Page title="network-map">
      <Backdrop
        className={classes.backdrop}
        open={backdrop}
        handleClose={removeSelectedItem}
      >
        <Arrow points={[pointItem, pointDevice]} isSelected={isSelected} />
      </Backdrop>
      <div className={classes.wrapper}>
        <div className={classes.wrapperTop}>
          <Network isSelected={isSelected} />
          <Router
            isSelected={false}
            selectedItem={selectedItem}
            selectItem={selectItem(setSelectedItem, setPointItem)}
            {...router}
          />
          <VPN isSelected={isSelected} message={undefined} />
        </div>
        <div className={clsx(classes.wrapperList)}>
          <NetworkMapList
            ItemComponent={InternateItem}
            items={ethernet.map((item) => ({
              id: item.id,
              name: item.name,
              ports: item.ports,
              ip: item.ip,
              os: item.os,
              selectedItem: selectedDevice ?? null,
              iconType: 1,
              selectedPort: selectedPort,
              selectItem: selectItem(setSelectedPort, setPointDevice),
            }))}
            subtitle={"ETHERNET"}
            className={classes.list}
          />
          <NetworkMapList
            ItemComponent={WIFIItem}
            items={wifi.map((item) => ({
              id: item.id,
              name: item.name,
              ports: item.ports,
              ip: item.ip,
              os: item.os,
              selectedItem: selectedDevice ?? null,
              iconType: 4,
              selectItem: selectItem(setSelectedDevice, setPointDevice),
            }))}
            subtitle={"WIFI"}
            className={classes.list}
          />
        </div>
      </div>
    </Page>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    wrapper: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(2),
      marginTop: theme.spacing(2),
      transition: "all 0.3s",
    },
    wrapperTop: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: theme.spacing(4),
      maxWidth: 400,
    },
    wrapperList: {
      display: "flex",
      flexGrow: 1,
      width: 1200,
      gap: theme.spacing(2),
      marginTop: theme.spacing(3),
    },
    list: {
      width: "50%",
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      border: `solid 1px ${theme.palette.info.main}`,
    },
    backdrop: {
      zIndex: 1200,
    },
  })
);

export { View };
