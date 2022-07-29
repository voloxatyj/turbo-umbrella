import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/useContext";
import { useCookie } from "../../hooks/useCookie";
import { Set_TabForm } from "../../context/reducer";
import config from "../../config/config";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGooglePlus } from "@fortawesome/free-brands-svg-icons";

export const ThirdForm: React.FC = (): JSX.Element => {   
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [, setCookie] = useCookie();
  
  const onCLickMailHandler = () => {
    window.open(config.gmail_url, "sharer", "toolbar=0,status=0,width=648,height=395")
  };
  
  const onClickBtnHandler = () => {
    navigate("members", { replace: true });
    dispatch(Set_TabForm("first"));
    setCookie("first");
  }

  return (
		<>
			<div id="example" className="share-icons-container">
				<span className="gmail-btn">
					<button onClick={onCLickMailHandler}>
						<FontAwesomeIcon icon={faGooglePlus} />
					</button>
				</span>
				<span className="fb-btn">
					<FacebookShareButton
						url={"https://peing.net/ja/"}
						className="Demo__some-network__share-button"
					>
						<FontAwesomeIcon icon={faFacebook} />
					</FacebookShareButton>
				</span>
				<span className="twit-btn">
					<TwitterShareButton
						title={`${config.textForSharing}`}
						url={"https://peing.net/ja/"}
					>
						<FontAwesomeIcon icon={faTwitter} />
					</TwitterShareButton>
				</span>
			</div>
			<div></div>
			<div className="btn-container col-xs-4 col-sm-8 col-md-10 col-lg-12 mt-5 mb-5">
				<button className="btn btn-primary" onClick={onClickBtnHandler}>
					Members Page
				</button>
			</div>
		</>
	);
}