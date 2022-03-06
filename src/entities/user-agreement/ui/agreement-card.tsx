import { PropsWithChildren } from "react";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { agreementModel, UserAgreementList } from "entities/user-agreement";
import {
  AgreementButton,
  AgreementCheckbox,
  checkedAgreementModel,
} from "features/user-agreement-checked";

import { Card } from "shared/components";
import {
  Button,
  IconButton,
  Input,
  ScrollableContentiner,
  Typography,
} from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useInput, useRouter, useValidations } from "shared/hooks";
import {
  minValue,
  required,
  stringMustContainCpecoalCharacter,
  stringMustContainNumber,
  valueMatch,
} from "shared/utils/validations";
import { Visibility, VisibilityOff } from "shared/assets/icons";
import { modelAuthCheck } from "processes/auth";
import { modelLoader } from "processes/loader";
import apiOld from "api.old";

export type UserAgreementCardProps = PropsWithChildren<{
  data: agreementModel.License;
  title: string;
}>;

const header1 = (
  <Typography className="agreement__title" variant="h5">
    Пользовательское соглашение
  </Typography>
);

const header2 = (
  <Typography className="agreement__title" variant="h5">
    Регистрация пользователя
  </Typography>
);

export const UserAgreementCard = ({ data, title }: UserAgreementCardProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const checked = checkedAgreementModel.selectors.useAgreement();

  const { history } = useRouter();

  const [open, setOpen] = useState<boolean>(true);
  const [open2, setOpen2] = useState<boolean>(true);

  const login = useInput("");
  const loginValid = useValidations({
    validations: [required, minValue(5)],
    value: login.value,
  });
  const password = useInput("");
  const passwordValid = useValidations({
    validations: [
      required,
      stringMustContainNumber(1),
      stringMustContainCpecoalCharacter(1),
      minValue(8),
    ],
    value: password.value,
  });
  const password2 = useInput("");
  const passwordValid2 = useValidations({
    validations: [required, valueMatch(password.value, "Пароли не совпадают")],
    value: password2.value,
  });

  const [step, setStep] = useState(1);

  const isDisabled =
    !!loginValid.error ||
    !!passwordValid.error ||
    !!passwordValid2.error ||
    !loginValid.touched ||
    !passwordValid.touched ||
    !passwordValid2.touched;

  return (
    <Card
      className={clsx("agreement__card", classes.card)}
      header={step === 1 ? header1 : header2}
      body={
        step === 1 ? (
          <div className={classes.wrapper}>
            <ScrollableContentiner className={classes.scroll}>
              <Typography variant="h6">{title}</Typography>
              <UserAgreementList data={data} />
            </ScrollableContentiner>
          </div>
        ) : (
          <>
            <Input
              {...login}
              {...loginValid}
              className={clsx(classes.field)}
              label={t("system:login")}
            />
            <Input
              {...password}
              {...passwordValid}
              className={classes.field}
              type={!open ? "text" : "password"}
              end={
                <IconButton onClick={() => setOpen(!open)}>
                  {open ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
              label={t("system:password")}
            />
            <Input
              {...password2}
              {...passwordValid2}
              className={classes.field}
              type={!open2 ? "text" : "password"}
              end={
                <IconButton onClick={() => setOpen2(!open2)}>
                  {open2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
              label={t("system:repeat-password")}
            />
          </>
        )
      }
      footer={
        step === 1 ? (
          <>
            <AgreementCheckbox
              label={t(`agereement:checkbox-label`)}
              checked={checked}
              onChange={checkedAgreementModel.events.toggleAgreement}
            />
            <AgreementButton
              className={classes.btn}
              label={t(`agereement:button-label`)}
              disabled={!checked}
              action={() => setStep((prev) => ++prev)}
            />
          </>
        ) : (
          <>
            <Button
              onClick={async () => {
                modelLoader.actions.toggleLoader();
                await apiOld.auth.create({
                  login: login.value,
                  password: password.value,
                });
                await modelAuthCheck.effects.getStatusFx();
                modelLoader.actions.toggleLoader();
                history.push(`/settings`);
              }}
              disabled={isDisabled}
              className={classes.btn}
            >
              Сохранить
            </Button>
          </>
        )
      }
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { maxWidth: 600, minWidth: 600, marginBottom: theme.spacing(6) },
    scroll: { position: "absolute", height: "100%", width: "100%" },
    wrapper: { position: "relative", height: 500 },
    btn: { marginLeft: "auto", borderRadius: theme.spacing(3) },
    field: {
      marginBottom: theme.spacing(2),
      "&:last-child": { margin: 0 },
    },
  })
);
