import { makeStyles, createStyles } from "@material-ui/core";

import { Page } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";

import VpnClient from "./VpnClient";
import VpnServer from "./VpnServer";

type Props = {};
const View: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Page title="vpn">
      <div className={classes.page}>
        <VpnServer />
        <VpnClient />
      </div>
    </Page>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    page: {
      display: "flex",
      alignItems: "flex-start",
      gap: theme.spacing(2),
      width: 1224,
      margin: `${theme.spacing(2)}px auto`,
    },
  })
);

export { View };
