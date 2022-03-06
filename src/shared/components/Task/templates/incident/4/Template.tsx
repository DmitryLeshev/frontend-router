import React from "react";
import { useParams } from "react-router";

import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
// import { List, ListItem, Section, Text, Title } from "../../components";
// eslint-disable-next-line
import { useTranslationTemplates } from "../../lib";

export default ({ api, data, fetchTask, children }: any) => {
  const classes = useStyles();
  const { taskId: id } = useParams<any>();
  // const { getListItem, getText, getTitle } = useTranslationTemplates({
  //   number: data.type,
  // });

  // const renderListItems = (i) => (
  //   <List dots="none">
  //     {[1, 2].map((j) => (
  //       <ListItem key={j}>{getListItem(i, j)}</ListItem>
  //     ))}
  //   </List>
  // );

  // const renderSection = (i) => {
  //   return (
  //     <Section key={i}>
  //       <Title>{getTitle(i)}</Title>
  //       {i !== 3 && <Text>{getText(i)}</Text>}
  //       {i === 3 && renderListItems(i)}
  //     </Section>
  //   );
  // };

  async function addWhiteList({ id, ip, domain }: any) {
    const res = await api.incident.buttons.setDecisionAction({
      id,
      ip,
      domain,
    });
    fetchTask();
  }

  return (
    <>
      {/* {[1, 2, 3].map(renderSection)} */}
      {children}
      <ul>
        <li className={classes.item}>
          <Grid item xs={4}>
            domain
          </Grid>
          <Grid item xs={4}>
            ip
          </Grid>
          <Grid item xs={4}></Grid>
        </li>
        {data?.body?.hosts?.map((el: any, idx: number) => (
          <li key={idx} className={classes.item}>
            <Grid className={classes.grid} item xs={4}>
              <Typography variant="h5">{el.domain}</Typography>
            </Grid>
            <Grid className={classes.grid} item xs={4}>
              <Typography variant="h5">{el.ip}</Typography>
            </Grid>
            <Grid className={classes.grid} item xs={4}>
              {el.white === 0 ? (
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() =>
                    addWhiteList({ id, ip: el.ip, domain: el.domain })
                  }
                >
                  Добавить в белый список
                </Button>
              ) : (
                <Typography>Добавлен в белый список</Typography>
              )}
            </Grid>
          </li>
        ))}
      </ul>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    padding: theme.spacing(3, 0, 3, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,

    "&:first-child": {
      background: "#eee",
    },

    "&:last-child": {
      borderBottom: "none",
    },
  },
  grid: {
    display: "flex",
    alignItems: "center",
  },
}));
