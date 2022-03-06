import {
  makeStyles,
  createStyles,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";
import { modelNavigation } from "features/navigation";
import { useStore } from "effector-react";

function SetHomePage() {
  const { t } = useTranslation();
  const classes = useStyles();

  const homePage = useStore(modelNavigation.stores.$homePage);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== "dashboard" && value !== "network-map") return;
    modelNavigation.actions.set(value);
  };

  return (
    <Card
      className={classes.card}
      header={<Typography>{t("system:set-home-page")}</Typography>}
      body={
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">Главная страница</FormLabel>
            <RadioGroup value={homePage} onChange={handleRadioChange}>
              <FormControlLabel
                value="dashboard"
                control={<Radio />}
                label="Dashboard"
              />
              <FormControlLabel
                value="network-map"
                control={<Radio />}
                label="Карта сети"
              />
            </RadioGroup>
          </FormControl>
        </>
      }
    />
  );
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { flexGrow: 1 },
  })
);

export default SetHomePage;
