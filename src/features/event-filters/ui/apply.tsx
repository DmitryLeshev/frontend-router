import { ReactElement } from "react";

import { modelEvent } from "entities/event";

import { Button } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";

import { actions } from "../model";
import { useStore } from "effector-react";

type Props = {
  isIncident: boolean;
};

export function EventFilterToApply({ isIncident }: Props): ReactElement {
  const query = modelEvent.querySelectors.useQuery();
  const { t } = useTranslation();
  const classes = useStyles();
  const isDisabled = useStore(actions.setFiltersFx.pending);
  return (
    <Button
      className={classes.btn}
      disabled={isDisabled}
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => {
        actions.filterToApplyBtn();
        // if (isIncident) {
        //   // modelEvent.incidentEffects.getIncidentsListFx(query);
        //   modelEvent.incidentEffects.getIncidentsWithFilterFx();
        // } else {
        //   // modelEvent.taskEffects.getTasksListFx(query);
        //   modelEvent.taskEffects.getTasksWithFilterFx();
        // }
      }}
    >
      {t(`common:filter.apply`)}
    </Button>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    btn: {
      borderRadius: theme.spacing(3),
      color: "#fff",
      //   color: theme.palette.getContrastText(theme.palette.primary.main),
      boxShadow: `${theme.palette.primary.dark} 1px 0 8px`,
    },
  })
);
