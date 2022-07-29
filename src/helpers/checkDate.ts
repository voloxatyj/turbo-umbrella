import dayjs from "dayjs";
import { IError } from "../types/interfaces";

export const checkDate = async (date: string, errors: IError): Promise<IError> => {
	const [year, month, day] = date.split("-");
  const [default_year, default_month, default_day] = new Date().toISOString().split("-");
  const conditionTodayDate = +year === +default_year && +month === +default_month && +day === +default_day.slice(0,2);
	if (dayjs(date).isAfter(new Date()) || conditionTodayDate) return { ...errors, birthdate: true };
  return { ...errors, birthdate: false };
};