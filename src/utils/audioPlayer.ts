let notificationPlayer:HTMLAudioElement;

export function playNotification() {
  if (!notificationPlayer) notificationPlayer = new Audio('/notification_wob.mp3');
  notificationPlayer.play()
    .catch(console.warn);
}