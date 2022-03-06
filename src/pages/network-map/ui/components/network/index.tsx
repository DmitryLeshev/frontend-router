import { makeStyles, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { ITheme } from "shared/ui/theme/theme";
import { PublicIcon } from "shared/assets/icons";

type NetworkProps = {
  isSelected: boolean;
};

function Network(props: NetworkProps): JSX.Element {
  const classes = useStyles("network-map");
  const { t } = useTranslation();

  return (
    <div
      className={clsx(classes.network, {
        [classes.detailed]: props.isSelected,
      })}
    >
      <PublicIcon className={classes.network} />
    </div>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    network: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 140,
      height: 140,
    },
    detailed: {
      position: "relative",
      zIndex: 1500,
    },
  })
);

export { Network };
