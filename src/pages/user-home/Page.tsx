import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { Page } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";
import api from "shared/api.old";

type Props = {
  Wifi24: any;
  Wifi5: any;
  Local: any;
  Internet: any;
  RouterCard: any;
  routers: any;
};

const View: React.FC<Props> = ({
  RouterCard,
  Wifi24,
  Wifi5,
  Local,
  Internet,
  routers,
}) => {
  const { t } = useTranslation();

  const [settings, setSettings] = React.useState<any | null>(null);
  const [lanwan, setLanwan] = React.useState<any | null>(null);

  function getInfo() {
    api.setting.getWifiInfo().then((res: any) => {
      const { data } = res;
      if (data) setSettings(data);
    });
    api.setting.getNetworkInfo().then((res: any) => {
      const { data } = res;
      if (data) setLanwan(data);
    });
  }
  React.useEffect(() => {
    getInfo();
  }, []);

  const classes = useStyles();
  return (
    <Page title={t("")}>
      <div className={classes.wrapper}>
        <RouterCard data={routers} />
        <Wifi24 getInfo={getInfo} settings={settings} />
        <Wifi5 getInfo={getInfo} settings={settings} />
        {/* <Local getInfo={getInfo} lan={lanwan?.lan ?? null} /> */}
        <Internet getInfo={getInfo} wan={lanwan?.wan ?? null} />
      </div>
    </Page>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: theme.spacing(2),
      margin: `0 auto`,
    },
  })
);

export default View;
