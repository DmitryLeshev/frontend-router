import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

export default (initialState: any) => {
  const [open, setOpen] = useState(initialState);
  const [urlSearch, setUrlSearch] = useState('');
  const history = useHistory();
  const match = useRouteMatch();
  const { search } = useLocation();

  useEffect(() => {
    if (search) setUrlSearch(search);
  }, [search]);

  const openTask = (id: any) => {
    setOpen(true);
    history.push(`${match.url}/${id}`);
  };

  const closeTask = () => {
    setOpen(false);
    const timeout = setTimeout(() => {
      // history.push(match.url + urlSearch);
      history.push(
        match.url.includes('tasks') ? '/events/tasks/in-work' : '/events/incidents',
      );

      clearTimeout(timeout);
    }, 300);
  };

  return {
    open,
    openTask,
    closeTask,
  };
};
