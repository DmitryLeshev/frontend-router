// const IT_BUTTONS = [34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

export default ({ data }: any) => {
  const { body, startTst, createTst, status, deviceInfo } = data;

  const dot = {
    name: `${body?.protocol?.toUpperCase()}://${body?.ip}:${body?.port}`,
    type: `${body?.protocol?.toUpperCase()}`,
  };

  return {
    createTst,
    status: new Date().getTime() / 1000 < startTst ? startTst : status,
    device: deviceInfo,
    po: body?.po,
    uri: body?.uri,
    host: body?.url || body?.host,
    dot: body?.protocol ? dot : null,
    port: body?.port,
  };
};
