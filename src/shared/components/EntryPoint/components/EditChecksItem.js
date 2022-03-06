import React from 'react';

import {
  Button,
  FormControl,
  OutlinedInput,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import DeviceIcon from '@src/assets/utils/DeviceIcon';
import EntryIcon from '@src/components/EntryPoint/components/EntryIcon';

const EditChecksItem = ({
  id,
  primary,
  secondary,
  action,
  changeValues,
  value,
  type,
  btnText,
  dataType,
  iconType,
}) => {
  const classes = useStyles({ id });

  const Input = (
    <FormControl fullWidth className={classes.fild} variant="outlined" size="small">
      <OutlinedInput type="number" value={value} onChange={changeValues} name={`${id}`} />
    </FormControl>
  );

  const Icon = () => {
    if (iconType === 'devices') {
      return <DeviceIcon className={classes.icon} type={type} />;
    }
    return (
      <span className={classes.icon}>
        <EntryIcon type={iconType} style={{ fill: '#000' }} />
      </span>
    );
  };

  const IconV2 = (
    <ListItemAvatar>{id !== 'defaultValue' ? <Icon /> : <Icon />}</ListItemAvatar>
  );

  return (
    <ListItem component="div">
      {IconV2}
      <ListItemText
        className={classes.text}
        primary={primary || 'primary primary'}
        secondary={secondary || null}
      />
      {Input}
      {dataType !== 'sel-3' && (
        <Button className={classes.btn} onClick={() => action(id)}>
          {btnText}
        </Button>
      )}
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  text: ({ id, v }) => ({
    minWidth: id !== 'defaultValue' && v === 1 ? 200 : 256,
    marginRight: theme.spacing(3),
  }),
  fild: {
    marginRight: theme.spacing(3),
  },
  btn: {
    minWidth: 250,
  },
  divider: {
    margin: theme.spacing(1.5, 0),
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    padding: theme.spacing(1),
  },
}));

export default EditChecksItem;
