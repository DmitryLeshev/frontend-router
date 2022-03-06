import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { Modal } from "shared/components";
import { useModal } from "shared/hooks";
import { Button, Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";

function CustomModal({ action, usemodal }: any) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Modal className={classes.modal} {...usemodal}>
      <Typography variant="h4">{t("system:are-you-sure")}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={async () => {
            await action();
            usemodal.closeModal();
          }}
          fullWidth
        >
          {t("system:yes")}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t("system:no")}
        </Button>
      </div>
    </Modal>
  );
}

interface Props {
  className: string;
  label: string;
  icon: any;
  action: any;
}

function CardAction({
  className,
  label,
  icon: Icon,
  action,
}: Props): ReactElement {
  const classes = useStyles();
  const usemodal = useModal();

  return (
    <>
      <Button
        className={(classes.WrapperBtn, className)}
        color="primary"
        onClick={usemodal.openModal}
      >
        <div className={classes.card2}>
          <Icon className={classes.icon} />
          <Typography variant="h5">{label}</Typography>
        </div>
      </Button>
      <CustomModal usemodal={usemodal} action={action} />
    </>
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: "reset" },
    btn: { marginLeft: "auto" },
    actions: {
      display: "flex",
      marginTop: theme.spacing(2),
      "& > button:last-child": { marginLeft: theme.spacing(2) },
    },
    modal: { minWidth: 600 },
    card2: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 198,
      height: 176,
    },
    icon: { width: 84, height: 84, marginBottom: theme.spacing(1) },
    WrapperBtn: {},
  })
);

export default CardAction;
