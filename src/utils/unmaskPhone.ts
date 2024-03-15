export const unmaskPhone = (phone: string) => {
  return phone.replace(/\D/g, "");
};
