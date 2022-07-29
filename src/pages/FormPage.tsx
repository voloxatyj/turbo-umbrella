import React, { useContext, useEffect } from "react";
import { Context } from "../context/useContext";
import { useCookie } from "../hooks/useCookie";
import { Set_TabForm } from "../context/reducer";
import Map from '../components/Map';
import { FirstForm } from '../components/forms/FirstForm';
import { SecondForm } from '../components/forms/SecondForm';
import { ThirdForm } from "../components/forms/ThirdForm";
import { Header } from "../components/Header";

export const FormPage: React.FC = (): JSX.Element => {
  const { state: { members, tab_form }, dispatch } = useContext(Context);
  const [cookie] = useCookie();
  
  useEffect(() => {
		dispatch(Set_TabForm(cookie));
	}, [!tab_form]);

  return (
		<>
			<Header />
			{(tab_form.startsWith("first") || tab_form.startsWith("second")) && <Map />}
			<div className="main-container" 
				style={{height: tab_form.startsWith("third") ? "90vh": "",
				alignItems: tab_form.startsWith("third") ? "center" : "none"
				}}>
				<div className="form-container" 
					style={{width: tab_form.startsWith("third") ? "90%" : "40%",
					display: tab_form.startsWith("third") ? "grid" : "",
    			gridTemplateRows: tab_form.startsWith("third") ? "10em 15em 1fr 10em" : "none"
					}}>
					{!tab_form.startsWith("second") && (
						<div className="title-container"
						style={{display: tab_form.startsWith("third") ? "grid" : "inherit",
						alignContent: tab_form.startsWith("third") ? "center" : "none"}}
						>
							<h3 style={{ textAlign: "center" }}>
								All members({members.length})
							</h3>
						</div>
					)}
					{tab_form.startsWith("first") && (<FirstForm />)}
					{tab_form.startsWith("second") && (<SecondForm />)}
					{tab_form.startsWith("third") && (<ThirdForm />)}
				</div>
			</div>
		</>
	);
}