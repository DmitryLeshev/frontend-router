import React from "react";

import { Button, makeStyles } from "@material-ui/core";
import { useParams } from "react-router";

export default ({ api, children, data, fetchTask }: any) => {
  const { taskId: id } = useParams<any>();
  const classes = useStyles();

  const setDecision = api.incident.buttons.setDecision;
  const { arpcage } = data.body;

  async function toBegin() {
    const res = await setDecision({
      id: Number(id),
      action: "arpCargeStart",
      params: { incedId: Number(id) },
    });
    fetchTask();
  }

  async function stop() {
    const res = await setDecision({
      id: Number(id),
      action: "arpCargeStop",
      params: { incedId: Number(id) },
    });
    fetchTask();
  }

  return (
    <>
      {children}
      <div className={classes.actions}>
        {arpcage ? (
          <Button variant="outlined" onClick={stop}>
            Остановить
          </Button>
        ) : (
          <Button variant="outlined" onClick={toBegin}>
            Начать
          </Button>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  actions: {
    display: "flex",
  },
  btn_fisrt: { marginRight: theme.spacing(2) },
}));
