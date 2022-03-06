import React, { useState } from 'react';

import { Tabs, Tab, makeStyles } from '@material-ui/core';
import DetailCardTab from './DetailCardTab';

const DetailCardTabsBody = ({ tabsConfig }: any) => {
  const classes = useStyles();

  const [tabId, setTabId] = useState(0);

  const handleChange = (event: any, newId: any) => {
    setTabId(newId);
  };

  return (
    <div className={classes.tabsWrapper}>
      <Tabs
        className={classes.tabs}
        value={tabId}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto">
        {tabsConfig.map((tabDetails: any) => (
          <Tab key={tabDetails.value} label={tabDetails.label} />
        ))}
      </Tabs>
      <div className={classes.containerTab}>
        {tabsConfig.map((el: any) => {
          if (el.id === tabId) {
            return <DetailCardTab key={el.id} data={el} tabId={tabId} />;
          } else return null;
        })}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  tabs: {
    position: 'relative',
    display: 'flex',
    margin: '0',
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: 'calc(100% - 270px)',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsSidebar: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    right: 0,
    width: 270,
    padding: theme.spacing(2),
  },
  containerTab: {
    position: 'relative',
    zIndex: 600,
    flexGrow: 1,
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.paper,
  },
  tab: {
    flexGrow: 1,
  },
}));

export default DetailCardTabsBody;
