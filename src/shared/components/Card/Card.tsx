import React, { memo } from "react";

import { createStyles, makeStyles } from "@material-ui/core";

import { ITheme } from "shared/ui/theme/theme";
import { Divider } from "shared/ui/components";
import clsx from "clsx";

interface Props {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  className?: any;
  bodyProps?: any;
  footerProps?: any;
}

export default memo(function Card({
  header,
  body,
  footer,
  className,
  bodyProps = {},
  footerProps = {},
}: Props) {
  const classes = useStyles();
  const { className: classNameBody, ...bProps } = bodyProps;
  const { className: classNameFooter, ...fProps } = footerProps;

  const renderHeader = header && (
    <>
      <div className={classes.header}>{header}</div>
      <Divider />
    </>
  );

  const renderBody = body && (
    <>
      <div className={clsx(classes.body, classNameBody)} {...bProps}>
        {body}
      </div>
      {footer && <Divider />}
    </>
  );

  return (
    <div className={clsx(classes.card, className)}>
      {renderHeader}
      {renderBody}
      {footer && (
        <div className={clsx(classes.footer, classNameFooter)} {...fProps}>
          {footer}
        </div>
      )}
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: () => ({
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      borderRadius: theme.spacing(2),
      transition: "all 0.3s",
      overflow: "hidden",
    }),
    header: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(3, 2),
    },
    body: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
    },
    footer: {
      display: "flex",
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),
    },
  })
);
