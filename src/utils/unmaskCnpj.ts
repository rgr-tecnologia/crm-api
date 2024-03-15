export const unmaskCnpj = (cnpj: string): string => {
  return cnpj.replace(/\D/g, "");
};
