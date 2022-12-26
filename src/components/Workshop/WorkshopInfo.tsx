import { useEffect, useState } from "react";
import dateformat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faPaintBrush, faBolt, faCode, faDisplay, faIcons } from "@fortawesome/free-solid-svg-icons";
import "./WorkshopInfo.css";
import { fetchData } from "../../service/Fetch";
const WorkshopInfo = ({ workshop }) => {
  let date = dateformat(workshop.date, "ddd dd.mm.yyyy.");
  let time = dateformat(workshop.date, "HH:MM");
  const [moderator, setModerator] = useState("");
  useEffect(() => {
    fetchData(`https://server-workshop.vercel.app/users/${workshop.userId}`).then((response) => {
      setModerator(response.name);
    });
  }, [workshop]);
  const getCategoryIcon = () => {
    switch (workshop.category) {
      case "marketing":
        return faBolt;
      case "design":
        return faPaintBrush;
      case "frontend":
        return faDisplay;
      case "backend":
        return faCode;
      default:
        return faIcons;
    }
  };
  return (
    <div className="workshop-info">
      <div className="workshop-time">
        <FontAwesomeIcon icon={faCalendarDays} className="workshop-icon" size="lg" />
        <p className="workshop-date-time">{date}</p>
        <FontAwesomeIcon icon={faClock} size="lg" className="workshop-icon" />
        <p className="workshop-date-time">{time} sati</p>
        <p className="workshop-date-time" style={{ marginRight: "0.4rem" }}>
          Kategorija:
        </p>
        <FontAwesomeIcon icon={getCategoryIcon()} size="2x" />
      </div>
      <h1>{workshop.title}</h1>
      <h3>
        WITH <h2>{moderator}</h2>
      </h3>
      <p className="workshop-description">{workshop.desc}</p>
    </div>
  );
};
export default WorkshopInfo;
