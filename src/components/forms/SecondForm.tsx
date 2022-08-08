import React, { useState, useContext, useMemo } from "react";
import { Context } from "../../context/useContext";
import { useCookie } from "../../hooks/useCookie";
import { updateMember, getAllMembers } from "../../services/api.service";
import { Set_TabForm, Update_Member, Set_Members } from "../../context/reducer";
import { IUserInfo } from "../../types/interfaces";
import { getBase64 } from "../../helpers/getBase64";
import { FormInput } from "../FormInput";

export const SecondForm: React.FC = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({ company: "", position: "", about: "", photo_url: "", photo_hash: "", photo_ext: "", photo: {} });
  const [, updateCookie] = useCookie();
  const { state: { members }, dispatch } = useContext(Context);

	async function getData() {
    const members = await getAllMembers();
    dispatch(Set_Members(members));
  };
  
  useMemo(() => {
    getData();
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement> ) => setUserInfo({ ...userInfo, [event.target.id]: event.target.value });

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !==null) {
      const photo_hash = await getBase64(event.target.files[0]);
      setUserInfo({
				...userInfo,
				photo: event.target.files[0].name,
				photo_hash,
				photo_ext: event.target.files[0].type,
				photo_url: URL.createObjectURL(event.target.files[0]),
			});
    }
	};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		const id = members[members.length - 1].id;
		debugger
    if (id) {
			updateMember(id, userInfo);
      dispatch(Update_Member(id, userInfo));
      dispatch(Set_TabForm("third"));
      updateCookie("third");
    }
  };

  return (
		<>
			<form className="secondForm" onSubmit={handleSubmit}>
				<div className="secondForm-row">
					<FormInput
						onChangeHandler={onChangeHandler}
						classNameDiv="col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3"
						value={userInfo.company || ""}
						field_id="company"
						field_value="Company"
						notification_disabled={true}
					/>
					<FormInput
						onChangeHandler={onChangeHandler}
						classNameDiv="col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3"
						value={userInfo.position || ""}
						field_id="position"
						field_value="Position"
						notification_disabled={true}
					/>
					<div className="col-xs-4 col-sm-8 col-md-10 col-lg-12 mb-3">
						<label htmlFor="aboutMe">About Me</label>
						<textarea
							id="aboutMe"
							className={`form-control ${!!userInfo.about ? "is-valid" : ""}`}
							onChange={(e) =>setUserInfo({ ...userInfo, about: e.target.value })}
						></textarea>
					</div>
					<div className="image-container">
						<div className="input-image">
							<label className="pl-3 mt-3" htmlFor="image">
								Choose Image
							</label>
							<input
								className="image pl-3"
								id="photo"
								type="file"
								multiple={true}
								onChange={onChangeImage}
							/>
						</div>
						<div className="render-image p-3">
							{userInfo.photo_url && (<img src={userInfo.photo_url} alt={userInfo.photo_url} />)}
						</div>
					</div>
					<div className="btn-container col-lg-7 col-md-7 mt-5 mr-3">
						<button className="btn btn-primary mb-5" type="submit">
							Next
						</button>
					</div>
				</div>
			</form>
		</>
	);
}