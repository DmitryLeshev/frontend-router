import { RouteChildrenProps } from "react-router-dom";
import { reflect } from "@effector/reflect";

import { agreementModel, UserAgreementCard } from "entities/user-agreement";

type Props = RouteChildrenProps<{}> & {
  data: agreementModel.License;
  title: string;
};

const View = ({ data, title }: Props) => {
  return <UserAgreementCard data={data} title={title} />;
};

const ActivationPage = reflect({
  view: View,
  bind: {
    data: agreementModel.license,
    title: agreementModel.title,
  },
});

export default ActivationPage;
