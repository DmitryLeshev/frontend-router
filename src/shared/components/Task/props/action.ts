export default ({ data, closeTask, updateItem }: any) => ({
  id: data.id,
  buttons: data.buttons || null,
  date: data.startTst || null,
  closeTask,
  data,
  updateItem,
});
