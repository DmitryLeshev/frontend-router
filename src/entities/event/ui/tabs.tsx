import { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles, Tab, Tabs } from "@material-ui/core";

import { configEvent, modelEvent } from "entities/event";

import { useGetParameter } from "shared/hooks";
import { ITheme } from "shared/ui/theme/theme";
import clsx from "clsx";
import { useState } from "react";
import { reflect } from "@effector/reflect";

interface Props {
  className?: string;
  getTasks: () => void;
}

function View({ className, getTasks }: Props): ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const query = modelEvent.querySelectors.useQuery();
  const status = useGetParameter("status");

  const [tabValue, setTabValue] = useState(0);

  const _renderTab = () => {
    return configEvent.tabs.map((tc) => {
      const { id, i18next, url } = tc;
      const label = tc.label ? tc.label : t(`${i18next}`);
      return <Tab key={id} label={label} component={Link} to={url} />;
    });
  };

  useEffect(() => {
    const selectedTab = configEvent.tabs.find((el) => el.tab === status);
    if (!selectedTab) return setTabValue(0);
    setTabValue(selectedTab.id);
    modelEvent.queryEvents.updateQueryConfig({
      progressId: status === "completed" ? 4 : 1,
    });
  }, [status]);

  return (
    <div className={clsx(classes.container, classes.tabs, className)}>
      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {_renderTab()}
      </Tabs>
    </div>
  );
}

export const TasksTabs = reflect({
  view: View,
  bind: {},
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    tabs: {
      margin: theme.spacing(0, 3, 0),
      borderBottom: `1px solid ${theme.palette.background.default}`,
      borderRadius: `16px 16px 0px 0px`,
    },
    container: {
      zIndex: theme.zIndex.appBar,
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
    },
  })
);
