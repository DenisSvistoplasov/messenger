import { inflectWord } from "./inflectWord";

const timePeriods = [
  {
    amount: 60 * 60 * 24 * 365,
    words: ['год', 'года', 'лет']
  },
  {
    amount: 60 * 60 * 24 * 30,
    words: ['месяц', 'месяца', 'месяцев']
  },
  {
    amount: 60 * 60 * 24 * 7,
    words: ['неделю', 'недели', 'недель']
  },
  {
    amount: 60 * 60 * 24,
    words: ['день', 'дня', 'дней']
  },
  {
    amount: 60 * 60,
    words: ['час', 'часа', 'часов']
  },
  {
    amount: 60,
    words: ['минуту', 'минуты', 'минут']
  },
  {
    amount: 1,
    words: ['секунду', 'секунды', 'секунд']
  },
];

export function formatTime(seconds: number) {
  if (seconds === 0) return "0 секунд";
  for (const period of timePeriods) {
    const number = Math.floor(seconds / period.amount);
    if (number > 0) {
      return number + ' ' + inflectWord(number, period.words as [string, string, string]);
    }
  }
  return seconds + ' секунды';
}