
const convertToName = (s: string) => s
  .replaceAll(' ', '-')
  .replace(/[~@#$%^&*()_[]{}:;|""''``<.,]/g, '');

export default convertToName;
