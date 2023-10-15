export function getElapsedTime(date: any): string {
  const timestamp = new Date(date).getTime();
  const elapsedMilliseconds = Math.abs(timestamp - new Date().getTime());

  const hours = Math.trunc(elapsedMilliseconds / 36e5);
  const minutes = Math.trunc((elapsedMilliseconds % 36e5) / 60000);

  if (hours >= 48) return `${Math.trunc(hours / 24)} days`;
  else if (hours >= 24) return `${Math.trunc(hours / 24)} day`;
  else if (hours === 1) return `${hours} hour ${minutes} minutes`;
  else if (hours > 1) return `${hours} hours ${minutes} minutes`;
  else return `${minutes} minutes`;
}
