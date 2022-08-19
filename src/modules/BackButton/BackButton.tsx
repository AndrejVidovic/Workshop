import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./BackButton.css";

const BackButton = () => {
  return (
    <Link to="/workshops" className="back-button-a">
      <div className="back-button-icon">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" style={{ color: "black" }} />
      </div>
      <p className="back-button-p">Natrag</p>
    </Link>
  );
};
export default BackButton;
