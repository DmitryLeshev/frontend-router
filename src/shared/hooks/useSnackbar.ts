import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

interface Props {
  msg: string;
  variant: 'success' | 'error' | 'warning';
}

export default () => {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (props: Props) => {
      const { msg, variant } = props;
      enqueueSnackbar(msg, { variant });
    },
    [enqueueSnackbar],
  );
};
