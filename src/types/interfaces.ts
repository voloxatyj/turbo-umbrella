export interface INotifications {
	positive?: string;
	negative?: string;
	error?: boolean;
	todayDate?: boolean;
}

export interface IFormInput {
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	classNameDiv: string;
	error?: boolean;
	error_value?: string;
	value: string;
	field_id: string;
	field_value: string;
	notification_disabled?: boolean;
}

export interface IPhoneInput {
	onChangePhoneInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	placeholder: string;
	className: string;
}

export interface IConfig {
	maps_api_key: string;
	maps_api_id: string;
	coordinates: {
		lat: number;
		lng: number;
	};
	address: string;
	baseUrl: string;
	textForSharing: string;
	gmail_url: string;
}

export interface IUser {
	firstname: string;
	lastname: string;
	birthdate: string;
	report_subject: string;
	phone: string;
	email: string;
	country_id: number | null;
}

export interface IUserInfo {
	about?: string;
	company?: string;
	position?: string;
	photo_url?: string;
	photo_hash?: string;
	photo_ext?: string;
	photo?: Object;
}

export interface IError {
	firstname: boolean;
	lastname: boolean;
	birthdate: boolean;
	report_subject: boolean;
	country_id: boolean;
	phone: boolean;
	email: boolean;
}

export interface ICountry {
	id: number;
	code: string;
	name: string;
	created_at: null;
	updated_at: null;
}

export interface IMember extends IUser, IUserInfo {
	id?: number;
	created_at?: string;
	deleted_at?: null;
	updated_at?: string;
}
