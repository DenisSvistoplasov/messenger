import { Timestamp } from "firebase/firestore";
import { formatTime } from "./formatTime";

export function getElapsedTime(timestamp: string | undefined) {
  if (!timestamp) return null;
  
  const elapsedTime = calcElapsedTime(new Date(timestamp));
  return elapsedTime === '0 секунд' ? 'только что' : elapsedTime + ' назад';
}

function calcElapsedTime(timestamp: Date) {
  const diffMillis = Date.now() - timestamp.getTime();
  const diffSeconds = Math.floor(diffMillis / 1000);
  return formatTime(diffSeconds);
}
