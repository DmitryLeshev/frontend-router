import { useHistory } from "react-router-dom";
import { createStyles, Dialog, makeStyles } from "@material-ui/core";

import {
  EventIcon,
  EventID,
  modelEvent,
  EventDeviceLink,
  EventDeviceIcon,
  EventDeviceName,
  EventTitle,
  EventDeviceType,
  EventCreateTime,
  EventDescription,
} from "entities/event";

import { ITheme } from "shared/ui/theme/theme";
import { useGetParameter } from "shared/hooks";
import { ArrowBackIcon } from "shared/assets/icons";
import { IconButton, Typography } from "shared/ui/components";
import { useEffect } from "react";
import { Loader } from "shared/components";
import { useClosePopup } from "../lib";

type Props = {
  isOpened: boolean;
};

export const Event = ({ isOpened }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const status = useGetParameter("status");
  const type: any = useGetParameter("type");
  const id = useGetParameter("id");

  const details = modelEvent.detailsSelectors.useDetails();
  const isLoading = modelEvent.detailsSelectors.useDetailsLoading();
  const { getDetailsFx } = modelEvent.detailsEffects;

  function goBack() {
    history.push(history.location.pathname);
  }

  useEffect(() => {
    getDetailsFx({ type, id: Number(id) });
  }, [id]);

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      onClose={goBack}
      open={isOpened}
    >
      {!details || isLoading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <>
            <div className={classes.header}>
              <IconButton
                className={classes.buttonBack}
                aria-label="back"
                onClick={goBack}
              >
                <ArrowBackIcon
                  className={classes.buttonBackIcon}
                  fontSize="large"
                />
              </IconButton>
              <EventIcon className={classes.icon} variant={type} />
              <EventTitle
                variant={type}
                type={details.type}
                titleVars={details.titleVars}
              />
              <EventID className={classes.id} id={details.id} />
            </div>
            <div className={classes.info}>
              <EventDeviceType entityType={details?.deviceInfo?.entityType} />
              <EventDeviceLink
                icon={<EventDeviceIcon type={details?.deviceInfo?.type} />}
                name={
                  <EventDeviceName name={details?.deviceInfo?.name ?? ""} />
                }
                url={`/devices/${details?.deviceInfo?.entityId}`}
              />
              <Typography className={classes.createTst} variant="body1">
                Время создания
              </Typography>
              <EventCreateTime createTst={details.createTst} />
            </div>
            <div className={classes.description}>
              <EventDescription details={details} controller={`${type}`} />
            </div>
          </>
        </div>
      )}
    </Dialog>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    dialog: {
      minHeight: `calc(100% - ${theme.spacing(24)}px)`,
      // minWidth: `calc(100% - ${theme.spacing(24)}px)`,
      maxWidth: "1224px",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    header: {
      display: "flex",
      alignItems: "center",
      minHeight: 50,
      width: "100%",
      padding: theme.spacing(2, 3, 2),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    buttonBack: {
      width: 40,
      height: 40,
      marginRight: theme.spacing(3),
    },
    buttonBackIcon: {},
    info: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(3),
    },
    id: { marginLeft: "auto" },
    icon: { marginRight: theme.spacing(3) },
    createTst: { marginLeft: "auto", marginRight: theme.spacing(2) },
    description: { padding: theme.spacing(0, 3, 3) },
  })
);
