export function getElapsedTime(date: EpochTimeStamp): string {
  const time = Math.trunc(Math.abs((date - new Date().getTime()) / 36e5));
  if (time > 24 && time < 48) return `${Math.trunc(time / 24)} day`;
  else if (time > 24) return `${Math.trunc(time / 24)} days`;
  else if (time < 1) return `${time} hour`;
  else return `${time} hours`;
}
