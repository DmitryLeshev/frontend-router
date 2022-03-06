import React, { useRef } from "react";
import {
  makeStyles,
  createStyles,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { ITheme } from "shared/ui/theme/theme";
import {
  List,
  ListItem,
  ScrollableContentiner,
  Typography,
} from "shared/ui/components";
import { DeviceIcon } from "shared/components";

type WIFIItemProps = {
  id: number;
  ip: string;
  name: string;
  os: string;
  ports: number[];
  selectedItem: number | null;
  iconType: number;
  selectItem: (id: number) => (ref: React.RefObject<HTMLLIElement>) => void;
  className?: string;
};

function WIFIItem(props: WIFIItemProps): JSX.Element {
  const classes = useStyles("network-map");
  const { t } = useTranslation();

  return (
    <ListItem className={clsx(classes.item, props.className)}>
      <ListItemIcon>
        <DeviceIcon className={classes.icon} type={props.iconType} />
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <Typography noWrap>{props.name}</Typography>
            <Typography noWrap variant="caption">
              {props.ip}
            </Typography>
          </>
        }
        secondaryTypographyProps={{
          component: "div",
        }}
        secondary={
          <div className={classes.scroll}>
            <ScrollableContentiner>
              <List>
                {props.ports.map((port, index) => {
                  return (
                    <PortItem
                      key={index}
                      port={port}
                      selectedItem={props.selectedItem}
                      selectItem={props.selectItem}
                    />
                  );
                })}
              </List>
            </ScrollableContentiner>
          </div>
        }
      />
    </ListItem>
  );
}

type PropsPortItem = {
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
      onClick={() => props.selectItem(props.port)(itemRef)}
      selected={isSelected}
      component="li"
      innerRef={itemRef}
    >
      <Typography variant="caption" noWrap color="textSecondary">
        {props.port}
      </Typography>
    </ListItem>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    item: {},
    port: {},
    selectedItem: {
      position: "relative",
      zIndex: 1500,
    },
    icon: {},
    scroll: { height: 120 },
  })
);

export { WIFIItem };
