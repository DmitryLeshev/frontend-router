export default async ({ fileName, lang = 'ru' }: any) => {
  const json = await fetch(`/locales/${lang}/${fileName}.json`);
  return await json.json();
};
