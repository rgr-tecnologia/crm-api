export const isMobilePhone = (value: string) => {
  const regex = /\(\d{2}\)\s\d{4,5}-\d{4}/;
  return regex.test(value);
};
