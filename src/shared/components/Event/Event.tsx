import { ITheme } from "shared/ui/theme/theme";
import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { CardHeader, CardBody } from "./components";
import { IEventHeader } from "./components/CardHeader";

export interface DeviceInfo {
  entityId: number;
  entityType: number;
  type: number;
  name?: string;
}

// ​​​​Номер описания задачи
export type Templates = 1 | 2 | 3;

enum EventStatus {
  IN_WORK = 1,
  COMPLETED = 6,
}

type TypeEventStatus = EventStatus.IN_WORK | EventStatus.COMPLETED;

export interface IEventBody {
  cves: any[];
  port: string;
  title: string;
}

export interface IEvent {
  body?: IEventBody;
  createTst: number;
  crt: number;
  deviceInfo: DeviceInfo;
  id: number;
  status: TypeEventStatus;
  titleVars: string[];
  type: Templates;
}

interface Props {
  event: IEvent;
  isIncident: boolean;
}

const Event = ({ event, isIncident }: Props) => {
  const classes = useStyles();
  const { createTst, crt, deviceInfo, id, status, titleVars, type, body } =
    event;
  const isFullScreen = false;
  const headerProps: IEventHeader = {
    id,
    isFullScreen,
    isIncident,
    titleVars: ["test"],
    type,
    closeTask: () => console.log("close"),
  };
  const bodyProps = {
    crt,
    deviceInfo,
    isFullScreen,
  };
  return (
    <div className={classes.event}>
      <CardHeader {...headerProps} />
      <CardBody {...bodyProps} />
    </div>
  );
};

export default Event;

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    event: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      marginBottom: theme.spacing(2),

      cursor: "pointer",
      transition: "all 0.3s ease-out",
      "&:hover": {
        boxShadow: theme.shadows[5],
      },
      "&:last-child": {
        marginBootm: theme.spacing(0),
      },
      "&:first-child": {
        marginTop: theme.spacing(1.5),
      },
    },
  })
);
