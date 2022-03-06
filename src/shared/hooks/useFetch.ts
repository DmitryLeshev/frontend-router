import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { apiActions } from 'shared/store/api/actions';
// import { selectApiState } from 'shared/store/api/selector';

interface Props {}

export default (endpoint: any) => {
  // const [controller, method] = endpoint.split('/');
  // const dispatch = useDispatch();
  // const apiState = useSelector(selectApiState);

  // const performFetch = useCallback(
  //   <T>(data?: T) => dispatch(apiActions.fetch(endpoint, data)),
  //   [endpoint, dispatch],
  // );
  // const state = useMemo(() => apiState[controller][method], [apiState, endpoint]);

  // return { state, performFetch };
  return {};
};
