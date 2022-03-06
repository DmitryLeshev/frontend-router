import { useSnackbar, VariantType } from 'notistack';
import { useTranslation } from 'react-i18next';

interface Props {
  msg: string;
  variant: 'success' | 'error' | 'warning';
}

const useCustomSnackbar = () => {
  const { enqueueSnackbar: fn } = useSnackbar();

  const { t } = useTranslation();

  function enqueueSnackbar(res?: any, tMain?: string) {
    const isError: boolean = !res?.status;
    const message: string = res?.msg ?? 'default-message';
    const variant: VariantType = isError ? 'error' : 'success';
    fn(t(`snackbar:${tMain ? tMain + '.' : ''}${message}`), { variant });
  }

  return { enqueueSnackbar };
};

export default useCustomSnackbar;
