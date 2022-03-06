import React from "react";
import { useHistory, Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { useGetParameter, usePrepareLink } from "shared/hooks";
import { GET_PARAMS } from "../config";
import { useClosePopup, usePreparePopupLink } from "../lib";

export * from "./event";

type Props = {
  isOpened: boolean;
};

export const SignIn = ({ isOpened }: Props) => {
  const styles = useStyles();
  const history = useHistory();

  return (
    <Dialog onClose={history.goBack} open={isOpened}>
      <form noValidate autoComplete="off" className={styles.container}>
        <h2>Sign In</h2>
        <TextField label="Username" className={styles.field} />
        <TextField label="Password" className={styles.field} />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={history.goBack}
        >
          Send
        </Button>
      </form>
    </Dialog>
  );
};

export const SignUp = ({ isOpened }: Props) => {
  const styles = useStyles();
  const history = useHistory();

  return (
    <Dialog onClose={history.goBack} open={Boolean(isOpened)}>
      <form noValidate autoComplete="off" className={styles.container}>
        <h2>Sign Up</h2>
        <TextField label="First Name" className={styles.field} />
        <TextField label="Last Name" className={styles.field} />
        <TextField label="Username" className={styles.field} />
        <TextField label="Password" className={styles.field} />
        <TextField label="Repeat Password" className={styles.field} />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={history.goBack}
        >
          Send
        </Button>
      </form>
    </Dialog>
  );
};

const NotificationItem = ({ notification }: any) => {
  const link = usePrepareLink({
    query: {
      [GET_PARAMS.notificationId]: notification.id,
    },
    keepOldQuery: true,
  });

  return (
    <li>
      <Link to={link}> List Item {notification.id}</Link>
    </li>
  );
};

export const Notifications = ({ isOpened }: Props) => {
  const notificationId = useGetParameter(GET_PARAMS.notificationId);
  const history = useHistory();
  const [id, setId] = React.useState(notificationId);
  const styles = useStyles();

  const closePopup = useClosePopup();

  React.useEffect(() => {
    if (notificationId) {
      setId(notificationId);
    }
  }, [notificationId]);

  return (
    <Dialog onClose={closePopup} open={Boolean(isOpened)}>
      <div className={styles.container}>
        <p>Notifications</p>
        <ul>
          {[{ id: 1 }].map((notification) => {
            return (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            );
          })}
        </ul>
        {/* {id && <NotificationDetails notificationId={id} />} */}
        {id && (
          <div>
            <p>Details {id}</p>
          </div>
        )}
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    container: {},
    field: {},
  })
);
