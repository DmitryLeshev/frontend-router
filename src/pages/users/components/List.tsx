import React, { memo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  createStyles,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";

import { Loader, Modal } from "shared/components";
import {
  IconButton,
  Input,
  ScrollableContentiner,
  Button,
  Typography,
} from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { useGetParameter, useInput, useModal } from "shared/hooks";
import { CreateUserArgs, User } from "shared/api/cubic/users";
import { PersonIcon, Visibility, VisibilityOff } from "shared/assets/icons";
import { useTranslation } from "react-i18next";
import { validations } from "shared/utils";
import { maxLength, minValue } from "shared/utils/validations";

interface Props {
  list: User[];
  createUser: (args: CreateUserArgs) => void;
}

export default function UsersList({ list, createUser }: Props) {
  const classes = useStyles();
  const id = useGetParameter("id");
  const modal = useModal();

  return (
    <List className={clsx(classes.list)}>
      {!list.length ? (
        <Loader />
      ) : (
        <ScrollableContentiner>
          {list.map((user: User, index) => {
            const isActive: boolean = Number(id) === user.id;
            return (
              <ListItem
                className={clsx(classes.item, { [classes.active]: isActive })}
                button
                component={Link}
                to={`/users?id=${user.id}`}
                key={index}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography noWrap>{user.login}</Typography>}
                  secondary={
                    <Typography noWrap variant="caption">
                      {user.role}
                    </Typography>
                  }
                />
                {/* <ListItemIcon>
                  <IconButton
                    className={classes.secondaryAction}
                    onClick={() => {
                      deleteUser({ id: user.id });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemIcon> */}
              </ListItem>
            );
          })}
        </ScrollableContentiner>
      )}
      <Button onClick={modal.openModal} className={classes.btn}>
        Создать пользователя
      </Button>
      <Modal
        {...modal}
        children={
          <CreateUserModal
            createUser={createUser}
            closeModal={modal.closeModal}
          />
        }
      />
    </List>
  );
}

type CreateUserModalProps = {
  createUser: (args: CreateUserArgs) => void;
  closeModal: () => void;
};
const CreateUserModal: React.FC<CreateUserModalProps> = ({
  closeModal,
  createUser,
}) => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);

  const login = useInput("", {
    label: t(`login`),
    validations: [minValue(3), maxLength(32)],
  });
  const password = useInput("", {
    label: t(`new-password`),
    validations: [minValue(6), maxLength(64)],
    end: (
      <IconButton onClick={() => setShow((prev) => !prev)}>
        {show ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    ),
  });

  function create() {
    const args: CreateUserArgs = {
      login: login.value,
      password: password.value,
    };
    createUser(args);
    closeModal();
  }
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h5">Создать пользователя</Typography>
      <Input
        className={classes.input}
        label={t("auth:login")}
        onPressCallback={{ code: "Enter", cb: create }}
        {...login}
      />
      <Input
        className={clsx(classes.input, classes.input_password)}
        label={t("auth:password")}
        type={show ? "text" : "password"}
        onPressCallback={{ code: "Enter", cb: create }}
        {...password}
      />
      <Button onClick={create}>Создать</Button>
    </div>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    list: { height: 1, flexGrow: 1, display: "flex", flexDirection: "column" },
    item: { overflow: "hidden" },
    active: {
      backgroundColor: theme.palette.action.selected,
      borderRight: `solid 4px ${theme.palette.primary.main}`,
      "$active &icon": { background: "#000" },
    },
    icon: {
      width: 40,
      height: 40,
    },
    icon_fill: { fill: theme.palette.primary.light },
    ip: { color: theme.palette.success.main },
    btn: { margin: theme.spacing(1, 2), borderRadius: theme.spacing(2) },
    input_password: { fontFamily: "Password" },
    input: {},
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
      margin: theme.spacing(2, 0),
      width: 400,
    },
    secondaryAction: { marginLeft: "auto" },
  })
);
