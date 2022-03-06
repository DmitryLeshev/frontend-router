import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ITheme } from "shared/ui/theme/theme";
import { List, ScrollableContentiner, Typography } from "shared/ui/components";
import clsx from "clsx";

type NetworkMapListProps<T> = {
  subtitle: string;
  ItemComponent: React.FC<T>;
  items: T[];
  className?: string;
};

function NetworkMapList<T>(props: NetworkMapListProps<T>): JSX.Element {
  const classes = useStyles("network-map");
  const { t } = useTranslation();

  const ListItem = props.ItemComponent;
  return (
    <div className={clsx(classes.wrapper, props.className)}>
      <Typography>{t(props.subtitle)}</Typography>
      <List className={classes.list}>
        {props.items.map((item, index) => {
          return <ListItem key={index} className={classes.item} {...item} />;
        })}
      </List>
    </div>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    wrapper: {},
    list: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: theme.spacing(1),
    },
    item: {
      width: "32%",
    },
  })
);

export { NetworkMapList };
