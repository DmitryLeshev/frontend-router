import { createStyles, makeStyles } from "@material-ui/core";
import { agreementModel, UserAgreementItem } from "entities/user-agreement";
import { ITheme } from "shared/ui/theme/theme";

export type UserAgreementCardProps = {
  data: agreementModel.License;
  numeric?: string;
};

export const UserAgreementList = ({
  data,
  numeric,
}: UserAgreementCardProps) => {
  return (
    <ul className="agreement__list list">
      {data.map((item, idx) => (
        <UserAgreementItem
          key={idx}
          numeric={numeric ? `${numeric}${idx + 1}.` : `${idx + 1}.`}
          {...item}
        />
      ))}
    </ul>
  );
};

const useStyles = makeStyles((theme: ITheme) => createStyles({}));
