import { IState } from "./state";
import { IMember, IUserInfo, ICountry } from "../types/interfaces";
import { ActionType, Actions, SetMembers, SetCountries, SetTabForm, AddMember, UpdateMember } from "./action";

export function stateReducer(state: IState, action: Actions): IState {
  const { type, payload } = action;

  switch (type) {
      case ActionType.SetMembers:
      return { ...state, members: [ ...payload ] };
      
      case ActionType.SetCountries:
      return { ...state, countries: [ ...payload ] };

      case ActionType.SetTabForm:
      return { ...state, tab_form: payload };

      case ActionType.AddMember:
      return { ...state, members: [...state.members,  { ...payload } ] };

      case ActionType.UpdateMember:
      const members = state.members.map((member) => {
        if (member.id === payload.id) {
          return { ...member, ...payload.userInfo };
        }
        return member;
      });
      return { ...state, members };
      
      default:
      debugger
      return state;
  }
}

// helper functions to simplify the caller
export const Set_Members = (members: IMember[]): SetMembers => ({
	type: ActionType.SetMembers,
	payload: members,
});

export const Add_Member = (member: IMember): AddMember => ({
	type: ActionType.AddMember,
	payload: member,
});

export const Update_Member = (id: number, userInfo: IUserInfo): UpdateMember => ({
	type: ActionType.UpdateMember,
	payload: { userInfo, id },
});

export const Set_Countries = (countries: ICountry[]): SetCountries => ({
	type: ActionType.SetCountries,
	payload: countries,
});

export const Set_TabForm = (tab_form: string): SetTabForm => ({
	type: ActionType.SetTabForm,
	payload: tab_form,
});