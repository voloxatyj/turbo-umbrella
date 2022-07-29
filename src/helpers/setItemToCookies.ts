export const setItemToCookies = (key:string, value:string, numberOfDays:number) => {
  const now = new Date();
  // set the time to be now + numberOfDays
  now.setTime(now.getTime() + (numberOfDays * 60 * 60 * 24 * 1000));
  document.cookie = `${key}=${value};     expires=${now.toUTCString()}; path=/`;
};