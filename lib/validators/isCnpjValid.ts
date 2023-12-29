export const isCnpjValid = (cnpj: string): boolean => {
  const cleanCnpj = cnpj.toString().replace(/\D/g, "");

  if (cleanCnpj.length !== 14) {
    console.log("Tamanho inválido");
    return false;
  }

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const cnpjArray = cleanCnpj.split("").map(Number);

  const calculateDigit = (slice: number[], weights: number[]): number => {
    const sum = slice.reduce(
      (acc, digit, index) => acc + digit * weights[index],
      0
    );
    const remainder = (sum * 10) % 11;
    return remainder === 10 || remainder === 11 ? 0 : remainder;
  };

  const firstDigit = calculateDigit(cnpjArray.slice(0, 12), weights1);
  const secondDigit = calculateDigit(cnpjArray.slice(0, 13), weights2);
  const isValid = cnpjArray[12] === firstDigit && cnpjArray[13] === secondDigit;

  return isValid;
};
