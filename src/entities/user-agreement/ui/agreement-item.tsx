import { createStyles, makeStyles } from "@material-ui/core";
import { agreementModel, UserAgreementList } from "entities/user-agreement";
import { ITheme } from "shared/ui/theme/theme";

export type UserAgreementItemProps = agreementModel.LicenseItem & {
  numeric: string;
};
export const UserAgreementItem = ({
  numeric,
  list,
  text,
  notNumeric,
}: UserAgreementItemProps) => {
  const classes = useStyles();
  return (
    <li className={classes.item}>
      {!notNumeric && <span className={classes.numeric}>{numeric}</span>} {text}
      {list && list.length > 0 && (
        <UserAgreementList data={list} numeric={numeric} />
      )}
    </li>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    item: {},
    numeric: {},
  })
);
