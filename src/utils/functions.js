import { CONVERT_MILLIS_TO_DAYS } from "./constants";

export const getDaysTo = (date) => {
  let milisNow = new Date().getTime();
  let dateMilis = date.getTime();
  return (milisNow - dateMilis) / CONVERT_MILLIS_TO_DAYS;
};
