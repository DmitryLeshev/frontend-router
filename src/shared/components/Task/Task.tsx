import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";

import { Dialog, makeStyles } from "@material-ui/core";

import { CardHeader, CardBody, DefaultDescription } from "./components";
import { ScrollableContentiner } from "shared/ui/components";

import props from "./props";
import api from "./api";
import { Loader } from "../Loader";
import { READY_TEMPLATES } from "./config/templates";

const Task = ({ open = true, closeTask }: any) => {
  const classes = useStyles();

  const { url } = useRouteMatch();

  const controller = !!url.split("/").find((el) => el === "incident")
    ? "incident"
    : "task";

  const [state, setState] = useState<any>(null);
  const { eventId: id } = useParams<{ eventId: string; status: string }>();

  async function fetchTask() {
    const res = await api[controller].get({ id });
    setState(res.data);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  if (!state)
    return (
      <Dialog
        open={open}
        onClose={closeTask}
        PaperProps={{ className: classes.root }}
      >
        <Loader />
      </Dialog>
    );

  const headerProps = props.header({
    data: state,
    windowCard: true,
    closeTask,
  });

  const templateProps = props.template({
    data: state,
    closeTask,
    api,
    fetchTask,
  });

  const infoProps = props.info({ data: state });
  const defaultDescriptionProps = props.defaultDescription({
    data: state,
    controller,
  });
  const isCustomTemplate = READY_TEMPLATES[controller].find(
    (t) => t === state.type
  );
  const CustomTemplate = React.lazy(
    () => import(`./templates/task/${state.type ?? "default"}`)
  );

  // const Content = isCustomTemplate ? (
  //   <CustomTemplate />
  // ) : (
  //   <DefaultDescription {...defaultDescriptionProps} />
  // );

  const content = !isCustomTemplate ? (
    <ScrollableContentiner>
      <DefaultDescription {...defaultDescriptionProps} />
    </ScrollableContentiner>
  ) : (
    <CustomTemplate {...templateProps} />
  );

  return (
    <Dialog
      open={open}
      onClose={closeTask}
      PaperProps={{ className: classes.root }}
    >
      <div className={classes.container}>
        <CardHeader {...headerProps} />
        <CardBody windowCard={true}>{content}</CardBody>
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    height: "95%",
    maxWidth: 1420,
    maxHeight: "95%", //mb v px cdelat'
    margin: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: 4,
    overflow: "hidden",
    color: "#000",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "calc(100%)",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default Task;
