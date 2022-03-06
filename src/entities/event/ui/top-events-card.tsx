import { useTranslation } from "react-i18next";

import { makeStyles, Typography } from "@material-ui/core";
import { Card } from "shared/components";
import { TopEvent } from "shared/api";
import { TopEventRow } from "./top-events-row";

export type TopEventsCardProps = {
  events: TopEvent[];
  isIncident: boolean;
};
export const TopEventsCard = ({ events, isIncident }: TopEventsCardProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const tBase = `home:top.${isIncident ? "incidents" : "tasks"}`;
  const title = t(`${tBase}.title`);
  const placeholder = t(`${tBase}.placeholder`);

  return (
    <Card
      className={classes.card}
      header={<Typography variant="h5">{title}</Typography>}
      bodyProps={{ className: classes.body }}
      body={
        <ul className={classes.list}>
          {events &&
            events.map((event, idx) => {
              const isLastEvent = events.length - 1 === idx;
              return (
                <TopEventRow
                  key={idx}
                  isIncident={isIncident}
                  isLastEvent={isLastEvent}
                  {...event}
                />
              );
            })}
        </ul>
      }
    />
  );
};

const useStyles = makeStyles((theme) => ({
  card: {},
  body: { padding: 0 },
  list: { listStyle: "none", padding: 0, margin: 0 },
}));
