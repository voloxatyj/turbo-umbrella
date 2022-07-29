import { useState } from "react";
import { getItemFromCookies } from '../helpers/getItemFromCookies';
import { setItemToCookies } from "../helpers/setItemToCookies";

export const useCookie = (key?:string):[cookie: string, updateCookie: Function] => {
  const getCookie = () => getItemFromCookies(key || "tab_form") || "first";
  const [cookie, setCookie] = useState(getCookie());
  
  const updateCookie = (value:string, numberOfDays:number) => {
    setCookie(value);
    setItemToCookies(key || "tab_form", value, numberOfDays);
  };
return [cookie, updateCookie];
};
