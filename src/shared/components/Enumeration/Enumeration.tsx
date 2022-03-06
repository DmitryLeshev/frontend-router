import React, { memo } from "react";
import { List, ListItem, Typography } from "shared/ui/components";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";

export interface EnumerationItem {
  key: string | React.ReactElement | null;
  value?: string | React.ReactElement | null;
  keySeconday?: string | React.ReactElement | null;
  valueSeconday?: string | React.ReactElement | null;
}

interface Props {
  items: EnumerationItem[];
  listItemProps?: string;
}

export default memo(function Enumeration({ items, listItemProps }: Props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {items.map((item, idx) => {
        const { key, keySeconday, value, valueSeconday } = item;
        return (
          <ListItem key={idx} className={clsx(classes.item, listItemProps)}>
            <Typography className={classes.key} variant="body1" component="div">
              {key}
            </Typography>
            {value && (
              <Typography
                className={classes.value}
                variant="body1"
                component="div"
              >
                {value}
              </Typography>
            )}
            {keySeconday && (
              <Typography
                className={clsx(classes.secodary, classes.key_secodary)}
                variant="caption"
              >
                {keySeconday}
              </Typography>
            )}
            {valueSeconday && (
              <Typography
                className={clsx(classes.secodary, classes.value_secodary)}
                variant="caption"
              >
                {valueSeconday}
              </Typography>
            )}
          </ListItem>
        );
      })}
    </List>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    list: {},
    item: {
      display: "grid",
      gridTemplateColumns: "max-content max-content",
      justifyContent: "space-between",
      gridTemplateAreas: `
        "key value"
        "key_s value_s"
      `,
    },
    key: { gridArea: "key" },
    value: { marginLeft: "auto", gridArea: "value", textAlign: "end" },
    key_secodary: { gridArea: "key_s" },
    value_secodary: { gridArea: "value_s", textAlign: "end" },
    secodary: {
      color: theme.palette.text.secondary,
      transform: `translateY(-${theme.spacing(1)}px)`,
    },
  })
);
