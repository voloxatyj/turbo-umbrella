import { ICountry, IMember, IUserInfo } from "../types/interfaces";

export enum ActionType {
	SetMembers,
	SetCountries,
	SetTabForm,
	AddMember,
	UpdateMember,
}

export interface SetMembers {
	type: ActionType.SetMembers;
	payload: IMember[];
}

export interface AddMember {
	type: ActionType.AddMember;
	payload: IMember;
}

export interface UpdateMember {
	type: ActionType.UpdateMember;
	payload: { id: number; userInfo: IUserInfo };
}

export interface SetCountries {
	type: ActionType.SetCountries;
	payload: ICountry[];
}

export interface SetTabForm {
	type: ActionType.SetTabForm;
	payload: string;
}

export type Actions =
	| SetMembers
	| SetCountries
	| SetTabForm
	| AddMember
	| UpdateMember;
