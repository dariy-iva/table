const now = new Date();
export const nowDay = now.getDate() > 9
  ? now.getDate()
  : '0' + now.getDate();
export const nowMonth = (now.getMonth() + 1) > 9
  ? now.getMonth() + 1
  : '0' + (now.getMonth() + 1);
export const nowYear = now.getFullYear();
export const nowDateInputFormat = `${nowYear}-${nowMonth}-${nowDay}`;
