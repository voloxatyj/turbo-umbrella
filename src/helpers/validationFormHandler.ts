import isEmail from "validator/es/lib/isEmail";
import { IError, IMember } from "../types/interfaces";

export const validationFormHandler = (
	event: React.ChangeEvent<HTMLInputElement>,
	members: IMember[],
	errors: IError
): IError => {
	switch (event.target.id) {
		case "firstname":
			if (event.target.value.length >= 3) {
				return { ...errors, [event.target.id]: false };
			}
			return { ...errors, [event.target.id]: true };
		case "lastname":
			if (event.target.value.length >= 3) {
				return { ...errors, [event.target.id]: false };
			}
			return { ...errors, [event.target.id]: true };
		case "report_subject":
			if (event.target.value.length >= 5) {
				return { ...errors, [event.target.id]: false };
			}
			return { ...errors, [event.target.id]: true };
		case "phone":
			const validationPhone = /^\(\+1\) [0-9]{3} [0-9]{3} [0-9]{4}$/;
			if (validationPhone.test(event.target.value)) {
				return { ...errors, [event.target.id]: false };
			}
			return { ...errors, [event.target.id]: true };
		case "email":
			const emailIsExist = members.some((member) =>
				member.email.includes(event.target.value)
			);
			if (isEmail(event.target.value) || !emailIsExist) {
				return { ...errors, [event.target.id]: false };
			}
			return { ...errors, [event.target.id]: true };
		default:
			return errors;
	}
};
