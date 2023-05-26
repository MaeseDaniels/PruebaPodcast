import { CONVERT_MILLIS_TO_DAYS } from "./constants";

export const getDaysTo = (date) => {
  let milisNow = new Date().getTime();
  let dateMilis = date.getTime();
  return (milisNow - dateMilis) / CONVERT_MILLIS_TO_DAYS;
};

/**
 * comprueba si hay datos en el localStorage de anteriores peticiones y
 * si ha pasado el tiempo necesario para tener que volver a pedir los datos a la api
 * @returns boolean
 */
export const compRefresh = (key, keyDate, daysToExpire) =>
  localStorage.getItem(key) &&
  localStorage.getItem(keyDate) &&
  getDaysTo(new Date(parseInt(localStorage.getItem(keyDate)))) < daysToExpire;

export const twoDigit = (n) => n.toString().padStart(2, "0");

export const millisToMInSecFormat = (millis) => {
  let res = "";

  if (millis) {
    let seconds = Math.floor(millis / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    res = `${twoDigit(hours)}:${twoDigit(minutes)}:${twoDigit(seconds)}`;
  } else {
    res = "N/A";
  }

  return res;
};

export const formatTableDate = (date) => {
  let nDate = new Date(date);

  return `${twoDigit(nDate.getDate())}/${twoDigit(
    nDate.getMonth() + 1
  )}/${nDate.getFullYear()}`;
};
