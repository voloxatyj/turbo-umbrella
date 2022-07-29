import { IMember, ICountry } from "../types/interfaces";

export interface IState {
	members: IMember[];
	countries: ICountry[];
	tab_form: string;
}

export const initialState: IState = {
    members: [],
    countries: [],
    tab_form: ""
};