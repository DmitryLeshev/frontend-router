interface Request {
  path: string;
  args?: any;
  token?: string;
}

async function mock({ path }: Request) {
  const [iface, method] = path.split('/');
  const filePath = `/mock/${iface}/${method}.json`;
  try {
    const json = await fetch(filePath);
    const data = await json.json();
    console.log('[MOCK]', { [path]: data });
    return data;
  } catch (error) {
    console.error('[MOCK] error', error);
  }
}

export default mock;
