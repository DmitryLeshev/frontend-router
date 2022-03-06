import { ITheme } from "shared/ui/theme/theme";
import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { ReactElement } from "react";
// import SimpleBar from "simplebar-react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  scrollRef?: any;
}

export default function ScrollableContentiner({
  children,
  className,
  scrollRef,
}: Props): ReactElement {
  const classes = useStyles();
  const ref = useRef(null);
  return (
    <PerfectScrollbar ref={scrollRef}>
      {/* <div className={clsx(classes.scroll, className)} ref={scrollRef}> */}
      {children}
      {/* </div> */}
      {/* <div className={classes.test} /> */}
    </PerfectScrollbar>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    scroll: { overflow: "auto" },
    contentEl: { display: "flex", flexDirection: "column" },
    test: {
      display: "flex",
      flexDirection: "column",
      background: `content-box radial-gradient(crimson, skyblue)`,
      height: 10000,
    },
  })
);
