import { reflect } from "@effector/reflect";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { Button, Input, Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

import { GetLogArgs, User, UpdateUserArgs } from "shared/api/cubic/users";
import { PersonIcon } from "shared/assets/icons";
import { Card, Enumeration, Modal, Table } from "shared/components";
import { ScrollableContentiner } from "shared/ui/components";

import * as model from "../model";
import { Log } from "../model/logs";
import { useEffect } from "react";
import { useInput, useModal } from "shared/hooks";
import { minValue, maxLength } from "shared/utils/validations";

interface Props {
  user: User;
  logs: Log[];
  getLogs: (args: GetLogArgs) => void;
  deleteUser: ({ id }: { id: number }) => void;
  updateUser: (args: UpdateUserArgs) => void;
}

function View({ user, logs, getLogs, deleteUser, updateUser }: Props) {
  const { t } = useTranslation("network-map");
  const modal = useModal();
  const modalDel = useModal();

  const login = useInput(user.login, {
    label: t(`login`),
    validations: [minValue(3), maxLength(32)],
  });
  const password = useInput("", {
    label: t(`new-password`),
    validations: [minValue(6), maxLength(64)],
  });

  const isValid = login.touched && !login.error && !password.error;

  function closeModal() {
    modal.closeModal();
    login.onChange();
    password.onChange();
  }

  useEffect(() => {
    getLogs({ id: user.id });
  }, [user]);

  const classes = useStyles();

  return (
    <>
      <div className={classes.tab}>
        <ScrollableContentiner>
          <div className={classes.content}>
            <Card
              className={classes.card}
              header={<Typography variant="h5">{t(`user-info`)}</Typography>}
              body={
                <Enumeration
                  items={Object.entries(user).map(([key, value]) => {
                    return { key: t(`${key}`), value: String(value) };
                  })}
                />
              }
              footerProps={{ className: classes.action }}
              footer={
                <>
                  <Button onClick={modal.openModal}>Редактировать</Button>
                  <Button onClick={modalDel.openModal}>Удалить</Button>
                  <Modal className={classes.modal} {...modalDel}>
                    <Card
                      header={<Typography>Вы уверены?</Typography>}
                      footerProps={{ className: classes.action }}
                      footer={
                        <>
                          <Button
                            onClick={() => {
                              deleteUser({ id: user.id });
                              modalDel.closeModal();
                            }}
                          >
                            Да
                          </Button>
                          <Button onClick={modalDel.closeModal}>Нет</Button>
                        </>
                      }
                    />
                  </Modal>
                </>
              }
            />
            <Card
              className={clsx(classes.card, classes.table)}
              header={<Typography variant="h5">{t(`last-actions`)}</Typography>}
              body={
                <Table
                  columns={[
                    {
                      headerName: t("time"),
                      field: "time",
                      width: "25%",
                      type: "data",
                    },
                    {
                      headerName: t("login"),
                      field: "login",
                      width: "25%",
                    },
                    {
                      headerName: t("action"),
                      field: "action",
                      width: "25%",
                    },
                    {
                      headerName: t("params"),
                      field: "params",
                      width: "25%",
                    },
                  ]}
                  rows={logs}
                />
              }
            />
          </div>
        </ScrollableContentiner>
      </div>
      <Modal className={classes.modal} {...modal} closeModal={closeModal}>
        <Card
          header={<Typography>Редактирование пользователя</Typography>}
          bodyProps={{ style: { gap: 16 } }}
          body={
            <>
              <Input {...login} />
              <Input {...password} />
            </>
          }
          footerProps={{ className: classes.action }}
          footer={
            <Button
              disabled={!isValid}
              onClick={() => {
                updateUser({
                  id: user.id,
                  login: login.value,
                  password: password.value,
                });
                closeModal();
              }}
            >
              Сохранить
            </Button>
          }
        />
      </Modal>
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    detail: {
      display: "grid",
      gridTemplateColumns: "max-content 1fr max-content",
      gridAutoRows: "max-content",
      margin: theme.spacing(0, 2, 1),
      padding: theme.spacing(2, 0, 2),
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
      alignItems: "center",
      borderRadius: theme.spacing(2),
    },
    tab: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      height: 0,
      margin: theme.spacing(0, 2),
    },
    wrapper: {},
    login: {},
    role: {},
    id: { margin: theme.spacing(0, 4) },
    icon: {
      margin: theme.spacing(0, 2),
      width: 80,
      height: 80,
      fill: theme.palette.primary.main,
    },
    content: {
      display: "flex",
      flexWrap: "wrap",
      height: 0,
      padding: theme.spacing(0, 2, 0),
      gap: theme.spacing(2),
      alignItems: "flex-start",
    },
    card: { flexGrow: 1 },
    table: { width: "100%" },
    action: { justifyContent: "flex-end", gap: theme.spacing(2) },
    modal: {
      padding: 0,
      borderRadius: theme.spacing(2),
      // backgroundColor: 'inherit',
    },
  })
);

const Details = reflect({
  view: View,
  bind: {
    logs: model.stores.$logs,
    getLogs: model.actions.getLogs,
    updateUser: model.actions.update,
  },
  hooks: {
    mounted: () => {
      console.log("Details Mounted");
    },
    unmounted: () => {
      model.actions.resetLogs();
    },
  },
});

export default Details;

// {/* <div className={classes.detail}>
//   <PersonIcon className={classes.icon} />
//   <div className={classes.wrapper}>
//     <Typography className={classes.login} variant="h3">
//       {user.login}
//     </Typography>
//     <Typography className={classes.role} variant="body1">
//       {user.role}
//     </Typography>
//   </div>
//   <Typography className={classes.id}>ID: {user.id}</Typography>
// </div> */}
