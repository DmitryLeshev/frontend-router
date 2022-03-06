import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  function enqueueSnackbarTemplates(response) {
    enqueueSnackbar(t(`snackbar.${response.msg}`), {
      variant: response.status ? 'success' : 'error',
    });
  }

  return { enqueueSnackbarTemplates };
};
