export default (quantity) => {
  return [...Array(quantity).keys()].map((x) => ++x);
};
