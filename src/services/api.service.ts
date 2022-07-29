import { http } from "../config/httpInstance";
import { AxiosResponse } from "axios";
import { ICountry, IMember, IUserInfo } from "../types/interfaces";

export const getCountries = async (): Promise<ICountry[]> => {
	const {	data: { countries }	} = await http.get("/countries");
	return countries;
};

export const getAllMembers = async (): Promise<IMember[]> => {
	const {	data: { data: members }	} = await http.get("/members");
	return members;
};

export const AddMember = async (user: IMember): Promise<IMember> => {
	const {	data: { member } } = await http.post<IMember, AxiosResponse>("/members", user);
	return member;
};

export const updateMember = async (id: number, userInfo: IUserInfo):Promise<IMember> => {
	const {	data: { member } } = await http.patch<IUserInfo, AxiosResponse>(`/members/${id}`, userInfo);
	return member;
};
