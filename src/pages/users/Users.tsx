import { makeStyles, createStyles } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { CreateUserArgs, DeleteUserArgs, User } from "shared/api/cubic/users";
import { Page, Placeholder } from "shared/components";
import { Input } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import List from "./components/List";
import Details from "./components/Details";
import { useGetParameter } from "shared/hooks";

type Props = {
  users: User[];
  getUsers: () => void;
  deleteUser: (args: DeleteUserArgs) => void;
  createUser: (args: CreateUserArgs) => void;
};

const View: React.FC<Props> = ({ users, createUser, deleteUser }) => {
  const { t } = useTranslation();
  const selectedUserId = Number(useGetParameter("id"));
  const selectedUser = users.find((user) => user.id === selectedUserId) ?? null;

  const classes = useStyles();
  return (
    <Page title={t("devices:page")}>
      <div className={classes.temlate}>
        <div className={classes.leftbar}>
          <Input
            className={classes.input}
            placeholder={t("devices:list.search")}
            name="search"
            fullWidth
          />
          <List list={users} createUser={createUser} />
        </div>
        <div className={classes.content}>
          {!selectedUser ? (
            <div className={classes.placeholder}>
              <Placeholder placeholder={t("devices:chooseUser")} />
            </div>
          ) : (
            <Details user={selectedUser} deleteUser={deleteUser} />
          )}
        </div>
      </div>
    </Page>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    temlate: {
      flexGrow: 1,
      display: "grid",
      gridTemplateAreas: `
        "leftbar content"
      `,
      gridTemplateColumns: "min-content 1fr",
      width: 1224,
      margin: `${theme.spacing(6)}px auto`,
    },
    leftbar: {
      display: "flex",
      flexDirection: "column",
      width: theme.drawer.openWidth + 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      borderRadius: theme.spacing(2),
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    input: { padding: theme.spacing(1.5, 1.5), borderRadius: 40 },
    scroll: { flexGrow: 1 },
    list: { height: 1, flexGrow: 1, overflowY: "auto" },
    item: { overflow: "hidden" },
    active: {
      backgroundColor: theme.palette.action.selected,
      borderRight: `solid 4px ${theme.palette.primary.main}`,
    },
    placeholder: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: theme.spacing(2),
      boxShadow: theme.shadows[3],
      background: theme.palette.background.paper,
      borderRadius: theme.spacing(2),
    },
  })
);

export default View;
