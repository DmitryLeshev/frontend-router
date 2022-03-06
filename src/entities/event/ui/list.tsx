import { PropsWithChildren, useRef } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { ScrollableContentiner } from "shared/ui/components";
import { useScroll } from "shared/hooks";

type Props = PropsWithChildren<{}> & {
  callback?: () => void;
};

export const EventList = ({ children, callback }: Props) => {
  const classes = useStyles();
  const childRef = useRef<any>(null);
  const parentRef = useRef<any>(null);

  const defaultCallback = () => console.log(`I'm callback`);

  useScroll({
    callback: callback ?? defaultCallback,
    childRef: childRef?.current,
    parentRef: parentRef?.current?._container,
  });

  return (
    <ScrollableContentiner scrollRef={parentRef} className={classes.scrollbar}>
      <ul className={classes.eventList}>{children}</ul>
      <div ref={childRef} />
    </ScrollableContentiner>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    eventList: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
      listStyle: "none",
    },
    scrollbar: { flexGrow: 1, height: 1 },
  })
);
