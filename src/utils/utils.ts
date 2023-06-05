export function createId(...data: any[]) {
  return ((getLast5Digits(data.join(''))||10) * getLast5Digits(Date.now())*(Math.random()*10+1)).toString(26).slice(-6);
}

function getLast5Digits(n: number | string) {
  return +('' + n).slice(-5);
}