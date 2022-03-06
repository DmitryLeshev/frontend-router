export const DeviceTypeName: any = {
  UNKNOWN: 'unknown',
  STATION: 'station',
  SERVER: 'server',
  PRINTER: 'printer',
  ROUTER: 'router',
  IP_TELEPHONY: 'ip_telephony',
  CAMERA: 'camera',
  TV: 'tv',
  TV_BOX: 'tv_box',
  WIFI: 'wifi',
  PHONE: 'phone',
  SECURITY: 'security',
  CASH: 'cash',
  BLUETOOTH: 'bluetooth',
};

export const DeviceTypeNumber: any = {
  0: 'UNKNOWN',
  1: 'STATION',
  2: 'SERVER',
  3: 'PRINTER',
  4: 'ROUTER',
  5: 'IP_TELEPHONY',
  6: 'CAMERA',
  7: 'TV',
  8: 'TV_BOX',
  9: 'WIFI',
  10: 'PHONE',
  11: 'SECURITY',
  12: 'CASH',
  13: 'BLUETOOTH',
};

export const translationDeviceType = (config: any) => {
  const tBase = `device_type`;
  const { typeName, typeNumber } = config;
  if (typeNumber || typeNumber === 0) {
    const name = DeviceTypeNumber[typeNumber];
    return `${tBase}.${DeviceTypeName[name]}`;
  }
  if (typeName) {
    return `${tBase}.${DeviceTypeName[typeName]}`;
  }
  if (!typeName && !typeNumber) {
    return console.error(`[transformDeviceType]: Передайте typeName или typeNumber`);
  }
  return null;
};
