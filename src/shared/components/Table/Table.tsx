import React, { memo } from "react";

import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { Css, DotNet, File, ComputerIcon } from "shared/assets/icons";
import { ScrollableContentiner } from "shared/ui/components";
import clsx from "clsx";
import { _trDate } from "shared/utils";
import Tooltip from "../Tooltip";

interface TableColumn {
  field: string;
  headerName: string;
  width?: string | number;
  icon?: React.ReactElement;
  base64?: string;
  type?: "data" | "icon" | "base64";
}

interface Props {
  columns: TableColumn[];
  rows: any[];
  sticky?: boolean;
}

const DefaultIcon = [Css, DotNet, File, ComputerIcon];

export default memo(function Table({ columns, rows, sticky }: Props) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.table, { [classes.table_sticky]: sticky })}>
      <div className={clsx(classes.row, { [classes.head]: sticky })}>
        {columns.map((col, idx) => (
          <div
            className={classes.col}
            style={{ width: col.width ?? "100%" }}
            key={idx}
          >
            {col.headerName}
          </div>
        ))}
      </div>
      {rows &&
        rows.map((row, idx) => (
          <div className={classes.row} key={idx}>
            {columns.map((col, colIdx) => (
              <div
                className={classes.col}
                style={{ width: col.width ?? "100%" }}
                key={colIdx}
              >
                {col.base64 ? (
                  row[col.base64] ? (
                    <img
                      className={classes.icon}
                      src={`data:image/png;base64, ${row[col.base64]}`}
                    />
                  ) : (
                    <Css className={classes.icon} />
                  )
                ) : null}
                {col.type === "data" ? (
                  _trDate.transformDate(
                    row[col.field],
                    _trDate.hh_mm_DD_MM_YYYY
                  )
                ) : (
                  <Tooltip word={row[col.field]} maxLength={20} />
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    table: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      border: `solid 1px ${theme.palette.grey[300]}`,
      "&:last-child": {
        borderBottom: "none",
      },
    },
    table_sticky: {
      borderTop: "none",
    },
    head: {
      position: "sticky",
      flexGrow: 1,
      top: 0,
      backgroundColor: theme.palette.background.paper,
      borderTop: `solid 1px ${theme.palette.grey[300]}`,
    },
    row: {
      display: "flex",
      borderBottom: `solid 1px ${theme.palette.grey[300]}`,
    },
    col: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2),
      // whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderRight: `solid 1px ${theme.palette.grey[300]}`,
      "&:last-child": {
        borderRight: "none",
      },
    },
    icon: {
      minWidth: 40,
      minHeight: 40,
      maxWidth: 40,
      maxHeight: 40,

      marginRight: theme.spacing(2),
    },
  })
);
