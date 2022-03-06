import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppActions from "shared/store/app/thunks";

const ActionCreators = { ...AppActions };

export default () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
