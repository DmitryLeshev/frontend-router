import { ReactElement } from "react";

import { modelEvent } from "entities/event";

import { Typography } from "shared/ui/components";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles, Slider } from "@material-ui/core";
import { ITheme } from "shared/ui/theme/theme";
import { reflect } from "@effector/reflect";

import { modelEventFilter } from "features/event-filters";

const marks = Array.from(Array(11).keys()).map((el) => {
  return {
    value: el * 10,
    label: `${el}`,
    color: el < 3 ? "success" : el < 7 ? "warning" : "error",
  };
});

function valuetext(value: any) {
  return `${value}°C`;
}

function valueLabelFormat(value: any) {
  return marks.findIndex((mark) => mark.value === value);
}

type Props = {
  updateData: (v: any) => void;
};

function View({ updateData }: Props): ReactElement {
  const { t } = useTranslation();
  const crt = modelEvent.querySelectors.useQuery().crt ?? [0, 100];
  const value = crt.map((c) => c * 10);

  const classes = useStyles();
  return (
    <div className={classes.critical}>
      <Typography>{t(`common:filter.criticality`)}</Typography>
      <Slider
        value={value}
        getAriaValueText={valuetext}
        onChange={(e: any, newValue: number | number[]) => {
          if (Array.isArray(newValue)) {
            newValue = newValue.map((n) => Math.floor(n / 10));
          } else newValue = Math.floor(newValue / 10);
          updateData({ crt: newValue });
          modelEventFilter.actions.filterOnChange({
            key: "crt",
            value: newValue,
          });
        }}
        valueLabelFormat={valueLabelFormat}
        valueLabelDisplay="auto"
        step={null}
        marks={marks}
      />
    </div>
  );
}

export const EventFilterCriticality = reflect({
  view: View,
  bind: {
    updateData: modelEvent.queryEvents.updateQueryConfig,
  },
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    critical: {},
  })
);
