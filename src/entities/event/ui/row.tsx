import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import {
  EventIcon,
  EventID,
  EventTitle,
  EventCriticality,
  EventCreateTime,
  EventDeviceLink,
  EventDeviceIcon,
  EventDeviceName,
  EventDeviceType,
} from "entities/event";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useGetParameter, useRouter } from "shared/hooks";

interface Props {
  data: import("shared/api").Event;
  variant: import("shared/api").EventVarinat;
  className?: string;
}

export function EventRow({ data, variant, className }: Props) {
  const classes = useStyles();
  const { location } = useRouter();
  const { pathname } = location;
  const status = useGetParameter("status");
  const taskParams = `?status=${
    status ?? "in-work"
  }&popup=event&type=${variant}&id=${data.id}`;
  const url = pathname + taskParams;

  return (
    <li
      className={clsx(classes.event, className, {
        [classes.viewed]: variant === "incident" && !data.show,
      })}
    >
      <Link className={classes.link} to={url}>
        <EventIcon variant={variant} />
        <div className={classes.info}>
          <EventTitle
            variant={variant}
            type={data?.type}
            titleVars={data?.titleVars}
          />
          <div className={classes.info_row}>
            {variant === "task" && (
              <EventCriticality crt={Number(data.crt ?? 0)} />
            )}
            <EventCreateTime createTst={data.createTst} />
          </div>
          <div className={classes.info_row}>
            <EventDeviceType entityType={data?.deviceInfo?.entityType} />
            <EventDeviceLink
              icon={<EventDeviceIcon type={data?.deviceInfo?.type} />}
              name={
                <EventDeviceName
                  name={data?.deviceInfo?.name || "Default Name"}
                />
              }
              url={`/devices?&id=${data?.deviceInfo?.entityId}&tab=info`}
            />
          </div>
        </div>
        <EventID id={data.id} />
      </Link>
    </li>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    event: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      zIndex: 0,
      flexGrow: 1,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.background.default}`,
      cursor: "pointer",
      transition: "all 0.3s ease-out",
      // boxShadow: `inset 0px 0px 0px ${theme.palette.secondary.main}`,
      boxShadow: `inset 0px 0px 0px rgba(0, 0, 0, 0.4)`,
      "&:hover": {
        // boxShadow: `inset 0px 0px 4px ${theme.palette.secondary.main}`,
        boxShadow: `inset 0px 0px 8px rgba(0, 0, 0, 0.4)`,
      },
      "&:active": {
        // boxShadow: `inset 0px 0px 4px ${theme.palette.secondary.main}`,
        boxShadow: `inset 0px 0px 24px rgba(0, 0, 0, 0.4)`,
      },

      "&:last-child": {
        // borderRadius: `0px 0px 16px 16px`,
      },
    },
    link: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      color: "inherit",
      textDecoration: "none",
    },
    info: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      marginLeft: theme.spacing(2),
    },
    info_row: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(1),
    },
    viewed: {
      "&::after": {
        content: "''",
        position: "absolute",
        right: 8,
        top: 34,
        display: "block",
        width: theme.spacing(2),
        height: theme.spacing(2),
        backgroundColor: theme.palette.warning.main,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
  })
);
