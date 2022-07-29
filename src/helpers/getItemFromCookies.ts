export const getItemFromCookies = (key:string): string =>
    document.cookie.split("; ").reduce((total, currentCookie) => {
       const item = currentCookie.split("=");
       const storedKey = item[0];
       const storedValue = item[1];
       return key === storedKey 
         ? decodeURIComponent(storedValue) 
         : total;
    }, '');