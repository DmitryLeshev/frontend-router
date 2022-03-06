import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

export default <T>() => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams<T>();
  const match = useRouteMatch<T>();

  return {
    history,
    location,
    params,
    match,
  };
};
