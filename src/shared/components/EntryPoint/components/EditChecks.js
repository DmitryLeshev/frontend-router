import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { useCustomInput } from '@src/assets/hooks';
import declOfNum from '@src/assets/utils/declOfNum';

import EditChecksItem from './EditChecksItem';

import SettingsApi from '../../../pages/settings/api';
import { useCustomSnackbar } from '../../../assets/hooks';

const EditChecks = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useCustomSnackbar();
  const { el, refreshData, closeModal } = props;

  const { value, onChange } = useCustomInput(el.settingValue);

  const saveSetting = async (id, defaultValue, newValuesSettings) => {
    const res = await SettingsApi.setSettingValue(id, defaultValue, newValuesSettings);
    await refreshData();
    closeModal();
    enqueueSnackbar(res, 'devices');
  };

  const propsDefaultItem = {
    id: '1',
    type: 0,
    primary: `${el.name}:${el.port}`,
    secondary: `${el.location}`,
    value,
    action: () => saveSetting(el.settingId, el.default, { [el.portId]: Number(value) }),
    changeValues: onChange,
    btnText: 'Сохранить',
    iconType: el.protocol,
  };

  const _getDeclWords = (type) => {
    if (type === 'time') return ['секунду', 'секунды', 'секунд'];
    if (type === 'days') return ['день', 'дня', 'дней'];
    if (type === 'minutes') return ['минуту', 'минуты', 'минут'];
    return [`data_type ${type}`, `data_type ${type}`, `data_type ${type}`];
  };

  return (
    <div className={classes.container} ref={ref}>
      <Typography variant="h3">
        Сканировать раз в {el.settingValue}{' '}
        {declOfNum(el.settingValue, _getDeclWords(el.data_type))}
      </Typography>
      <EditChecksItem {...propsDefaultItem} />
    </div>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    minWidth: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
}));

export default EditChecks;
