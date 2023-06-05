// секунда, секунды, секунд
export function inflectWord(number: number, inflectedWords: [string, string, string]) {
  if (number % 100 >= 10 && number % 100 <= 19) return inflectedWords[2];
  const lastDigit = number % 10;
  if (lastDigit == 1) return inflectedWords[0];
  if (lastDigit >= 2 && lastDigit <= 4) return inflectedWords[1];
  return inflectedWords[2];
}