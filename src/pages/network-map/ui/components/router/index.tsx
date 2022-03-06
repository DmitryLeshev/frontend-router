import React, { useRef } from "react";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import src_router_png from "shared/assets/png/router.png";
import { ITheme } from "shared/ui/theme/theme";

import { Router as RouterType } from "../../../model";
import { List, ListItem } from "shared/ui/components";
import { cubicApi } from "shared/api";

type RouterProps = RouterType & {
  isSelected: boolean;
  selectedItem: number | null;
  selectItem: (id: number) => (ref: React.RefObject<HTMLLIElement>) => void;
};

function Router(props: RouterProps): JSX.Element {
  const classes = useStyles("network-map");
  const { t } = useTranslation();

  return (
    <div
      className={clsx(classes.router, {
        [classes.detailed]: props.isSelected,
      })}
    >
      <Ports
        isSelected={props.isSelected}
        ip={props.internal.ip}
        ports={props.internal.ports}
        selectedItem={props.selectedItem}
        selectItem={props.selectItem}
      />
      <img src={src_router_png} className={classes.img} />
      <Ports
        isSelected={props.isSelected}
        ip={props.external.ip}
        ports={props.external.ports}
        selectedItem={props.selectedItem}
        selectItem={props.selectItem}
      />
    </div>
  );
}

type PropsPorts = {
  ip: string;
  isSelected: boolean;
  ports: cubicApi.networkMap.RouterPortByDevice[];
  selectedItem: number | null;
  selectItem: (id: number) => (ref: React.RefObject<HTMLLIElement>) => void;
};

const Ports: React.FC<PropsPorts> = (props) => {
  const classes = useStyles("network-map");

  return (
    <div
      className={clsx(classes.wrapper, {
        [classes.portsIsSelected]: props.isSelected,
      })}
    >
      <Typography variant="h6" className={classes.ip}>
        {props.ip}
      </Typography>
      <List className={classes.ports}>
        {props.ports.map(({ deviceId, port }, index) => (
          <PortItem
            deviceId={deviceId}
            key={index}
            port={port}
            selectedItem={props.selectedItem}
            selectItem={props.selectItem}
          />
        ))}
      </List>
    </div>
  );
};

type PropsPortItem = {
  deviceId: number;
  port: number;
  selectedItem: number | null;
  selectItem: (id: number) => (ref: React.RefObject<HTMLLIElement>) => void;
};

const PortItem: React.FC<PropsPortItem> = (props) => {
  const classes = useStyles("network-map");
  const isSelected = props.port === props.selectedItem;
  const itemRef = useRef<HTMLLIElement>(null);
  return (
    <ListItem
      button
      className={clsx(classes.port, {
        [classes.selectedItem]: isSelected,
      })}
      onClick={() => {
        console.log("Найти устройство с ID: ", props.deviceId);
        props.selectItem(props.port)(itemRef);
      }}
      selected={isSelected}
      component="li"
      innerRef={itemRef}
    >
      <Typography variant="body2" color="textSecondary">
        {props.port}
      </Typography>
    </ListItem>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    router: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: 1200,
      height: 200,
    },
    detailed: {
      position: "relative",
      zIndex: 1500,
    },
    img: {
      width: 500,
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
      width: 300,
    },
    ports: {
      display: "flex",
      listStyle: "none",
      flexWrap: "wrap",
      flexDirection: "row",
      gap: theme.spacing(1),
      margin: 0,
      padding: 0,
    },
    port: { width: "auto" },
    portsIsSelected: {},
    url: {
      color: theme.palette.common.black,
    },
    ip: { marginLeft: theme.spacing(2) },
    selectedItem: {
      position: "relative",
      zIndex: 1500,
    },
  })
);

export { Router };
