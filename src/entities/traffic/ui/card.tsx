import { Card } from "shared/components";
import { Typography } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { Traffic } from "shared/api";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { TrafficGraph } from "./graph";
import { Subtitle } from "./subtitle";

interface Props {
  data: Traffic[];
}

export const TrafficCard = ({ data }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const header = (
    <Typography variant="h5">{t("home:internet.title")}</Typography>
  );
  return (
    <Card
      className={classes.card}
      header={header}
      body={
        <>
          <Typography className={classes.subtitle} variant="body1" paragraph>
            Трафик <span className={classes.mbit}>Mbit/s</span>
            <Subtitle variant="reception">
              {t("home:internet.reception")}
            </Subtitle>
            <Subtitle variant="broadcast">
              {t("home:internet.broadcast")}
            </Subtitle>
          </Typography>
          <TrafficGraph data={data} />
        </>
      }
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { flexGrow: 1 },
    subtitle: { display: "flex" },
    mbit: { marginLeft: theme.spacing(1), fontSize: 12 },
  })
);
