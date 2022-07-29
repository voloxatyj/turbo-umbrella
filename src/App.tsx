import React, { useMemo, useReducer } from "react";
import { Context } from "./context/useContext";
import { stateReducer, Set_Members, Set_Countries } from "./context/reducer";
import { initialState } from "./context/state";
import { getAllMembers, getCountries } from "./services/api.service";
import {Routes,Route } from "react-router-dom";
import { FormPage } from "./pages/FormPage";
import { ListMembersPage } from "./pages/ListMembersPage";

export const App: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  async function getData() {
    const members = await getAllMembers();
    const countries = await getCountries();
    dispatch(Set_Members(members));
    dispatch(Set_Countries(countries));
  };
  
  useMemo(() => {
    getData();
  }, []);

  return(
    <>
      <Context.Provider value={{ state, dispatch }}>   
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/members" element={<ListMembersPage />} />
        </Routes>
      </Context.Provider>
    </>
  );
}