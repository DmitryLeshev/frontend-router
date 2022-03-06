import { reflect } from "@effector/reflect";
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
import { combine, createEffect, createStore, forward } from "effector";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cubicApi } from "shared/api";
import { Card } from "shared/components";
import { ITheme } from "shared/ui/theme/theme";

const getStatusFx = createEffect(() => {
  return cubicApi.setting.adminAction({ action: "status" });
});
const addAdminFx = createEffect(() => {
  return cubicApi.setting.adminAction({ action: "add" });
});
const delAdminFx = createEffect(() => {
  return cubicApi.setting.adminAction({ action: "del" });
});
const $status = createStore<"inactive" | "active" | null>(null);
$status.on(getStatusFx.doneData, (_, res) => res.data ?? null);

const $isLoading = combine(
  getStatusFx.pending,
  addAdminFx.pending,
  delAdminFx.pending,
  (...booleans) => {
    return booleans.find(Boolean) ?? false;
  }
);

forward({
  from: [addAdminFx.doneData, delAdminFx.doneData],
  to: getStatusFx,
});

type Props = {
  isLoading: boolean;
  status: "inactive" | "active" | null;
  del: () => void;
  add: () => void;
};

function Adminka({ status, del, add, isLoading }: Props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "inactive") return del();
    if (value === "active") return add();
  };

  console.log({ isLoading });

  return (
    <Card
      className={classes.card}
      header={<Typography>{t("Админка")}</Typography>}
      body={
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">Дать доступ из вне</FormLabel>
            <RadioGroup value={status} onChange={handleRadioChange}>
              <FormControlLabel value="active" control={<Radio />} label="Да" />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="Нет"
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
    card: { flexGrow: 1, gridArea: "adminka" },
  })
);

const Component = reflect({
  view: Adminka,
  bind: {
    isLoading: $isLoading,
    status: $status,
    add: addAdminFx,
    del: delAdminFx,
  },
  hooks: {
    mounted: () => getStatusFx(),
  },
});

export default Component;
