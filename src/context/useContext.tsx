import { createContext, Dispatch } from 'react';
import { IState, initialState } from './state';
import { Actions } from './action';

export const Context = createContext<{
  state: IState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
