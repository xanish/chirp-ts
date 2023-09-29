export default (object: Object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v != null && v != '')
  );
};
