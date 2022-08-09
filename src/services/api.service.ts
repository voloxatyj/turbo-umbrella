import { http, headers } from "../config/httpInstance";
import axios from "axios";
import config from "../config/config";
import { ICountry, IMember, IUserInfo } from "../types/interfaces";

export const getCountries = async (): Promise<ICountry[]> => {
	const {	data: { countries }	} = await http.get("/countries");
	return countries;
};

export const getAllMembers = async (): Promise<IMember[]> => {
	const {	data: { data: members }	} = await http.get("/members");
	return members;
};

export const AddMember = async (user: IMember): Promise<IMember | any> => {
	const Config = {
    method: 'post',
    url: `${config.baseUrl}/members`,
    headers,
    data: user,
  };

  return axios(Config)
    .then(function (response) {
      return { member: response.data }; 
    })
    .catch(function (error) {
      return error.response.data; 
    });
};

export const updateMember = async (id: number, userInfo: IUserInfo):Promise<IMember | any> => {
	const Config = {
    method: 'patch',
    url: `${config.baseUrl}/members/${id}`,
    headers,
    data: userInfo,
  };

  return axios(Config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};
