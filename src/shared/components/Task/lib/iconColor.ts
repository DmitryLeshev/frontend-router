export default (theme: any, type: any, value: any, priority: any) => {
  if (type === 'ATTACK') {
    if (priority) return theme.palette.error.main;
    return theme.palette.secondary.main;
  }
  if (type === 'MESSAGE') {
    return theme.palette.secondary.light;
  }
  if (type === 'SETTINGS') {
    return theme.palette.grey[500];
  }
  if (type === 'WARNING') {
    if (value) {
      return value < 3
        ? theme.palette.success.light
        : value < 7
        ? theme.palette.warning.light
        : theme.palette.error.light;
    }
    return theme.palette.warning.light;
  }
};
