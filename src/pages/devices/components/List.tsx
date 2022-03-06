import React, { memo } from "react";
import { Link, useParams } from "react-router-dom";

import {
  createStyles,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";

import { DeviceIcon, Loader } from "shared/components";
import { ScrollableContentiner, Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { whenWasOnline } from "shared/utils";
import { ItemDevice } from "../Devices";
import { useGetParameter } from "shared/hooks";

interface Props {
  list: ItemDevice[];
}

export default memo(function DeviceList({ list }: Props) {
  const id = useGetParameter("id");
  const classes = useStyles();

  return (
    <List className={clsx(classes.list)}>
      {!list.length ? (
        <Loader />
      ) : (
        <ScrollableContentiner>
          {list.map((device: ItemDevice) => {
            const isActive: boolean = Number(id) === device.id;
            const isOline: boolean = typeof device.online === "boolean";
            return (
              <ListItem
                className={clsx(classes.item, { [classes.active]: isActive })}
                button
                component={Link}
                to={`/devices?id=${device.id}&tab=info`}
                key={device.id}
              >
                <ListItemIcon>
                  <DeviceIcon
                    className={clsx(classes.icon, {
                      [classes.icon_fill]: isOline,
                    })}
                    type={device.type}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography noWrap>{device.name}</Typography>}
                  secondary={
                    typeof device.online === "boolean" ? (
                      <Typography
                        className={classes.ip}
                        variant="caption"
                        noWrap
                      >
                        {device.ip}
                      </Typography>
                    ) : (
                      whenWasOnline(device.online)
                    )
                  }
                />
              </ListItem>
            );
          })}
        </ScrollableContentiner>
      )}
    </List>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    list: { height: 1, flexGrow: 1, display: "flex", flexDirection: "column" },
    item: { overflow: "hidden" },
    active: {
      backgroundColor: theme.palette.action.selected,
      borderRight: `solid 4px ${theme.palette.primary.main}`,
      "$active &icon": { background: "#000" },
    },
    icon: {
      width: 40,
      height: 40,
    },
    icon_fill: { fill: theme.palette.primary.light },
    ip: { color: theme.palette.success.main },
  })
);
