import React, { useContext } from "react";
import { Context } from "../context/useContext";
import { IMember } from "../types/interfaces";
import { Header } from "../components/Header";
import sceleton from "../assets/sceleton.jpg";

export const ListMembersPage: React.FC = (): JSX.Element => {
  const { state: { members } } = useContext(Context);

  return (
		<>
			<Header />
			<div className="card-container">
				{members.map((member: IMember) => (
					<div key={member.id} className="card m-5 p-3">
						<div className="card-image">
							<img
								className="card-img"
								src={member.photo_url || member.photo_hash || sceleton}
								alt={`${member.firstname} ${member.lastname}`}
							/>
						</div>
						<div className="card-body">
							<div className="fullName">
								<span className="font-italic">Full Name</span>
								<h2>{member.firstname} {member.lastname}</h2>
							</div>
							<div className="report_subject">
								<span className="font-italic">Report Subject</span>
								<h3 >{member.report_subject}</h3>
							</div>
							<div className="email">
								<span className="font-italic">Email</span>
								<a className="card-email" href={`mailto:${member.email}`}>
								<h3>{member.email}</h3>
							</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);}