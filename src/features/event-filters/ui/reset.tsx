import { ReactElement } from "react";

import { modelEvent } from "entities/event";

import { Button } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { actions } from "../model";

type Props = {
  isIncident: boolean;
};

export function EventFilterReset({ isIncident }: Props): ReactElement {
  const query = modelEvent.querySelectors.useQuery();
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      color="primary"
      fullWidth
      onClick={() => {
        actions.filterReset();
        actions.filterToApplyBtn();
        // modelEvent.queryEvents.resetQueryConfig();
        // if (isIncident) {
        //   modelEvent.incidentEffects.getIncidentsListFx(query);
        // } else modelEvent.taskEffects.getTasksListFx(query);
      }}
    >
      {t(`common:filter.reset`)}
    </Button>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    btn: {
      borderRadius: theme.spacing(3),
    },
  })
);
