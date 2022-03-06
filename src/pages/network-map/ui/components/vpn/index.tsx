import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { ITheme } from "shared/ui/theme/theme";
import { Typography } from "shared/ui/components";

type VPNProps = {
  isSelected: boolean;
  message?: string;
};

function VPN(props: VPNProps): JSX.Element {
  const classes = useStyles("network-map");
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.vpn)}>
      <div
        className={clsx({
          [classes.detailed]: props.isSelected,
        })}
      >
        <Typography variant="h6">{t("VPN")}</Typography>
        {props.message && (
          <Typography variant="caption" color="error" align="center">
            {props.message}
          </Typography>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    vpn: {
      position: "absolute",
      right: -200,
      top: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: 100,
      height: 100,
    },
    detailed: {
      position: "relative",
      zIndex: 1500,
    },
  })
);

export { VPN };
