export default ({ data, windowCard }: any) => ({
  responsible: data.responsible,
  createTst: data.createTst,
  status: data.status,
  isIncident: data.class === 1 || data.class === 2,
  windowCard,
});
