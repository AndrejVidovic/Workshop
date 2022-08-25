import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Workshop.css";
import WorkshopImages from "../../components/Workshop/WorkshopImages";
import WorkshopCard from "../../components/Workshops/WorkshopCard";
import WorkshopInfo from "../../components/Workshop/WorkshopInfo";
import Cart from "../../components/Workshop/Cart";
import { ThreeDots } from "react-loader-spinner";
import BackButton from "../BackButton/BackButton";
import { fetchData } from "../../service/Fetch";

const Workshop = () => {
  let workshopId = useParams();
  const [workshop, setWorkshop] = useState({
    id: null,
    title: "",
    desc: "",
    price: null,
    date: "",
    category: "",
    imageUrl: "",
    user: null,
  });
  const [recomended, setRecomended] = useState([]);
  useEffect(() => {
    fetchData(`https://locastic-server.herokuapp.com/workshops/${workshopId.id}`).then((response) => {
      setWorkshop(response);
    });
  }, [workshopId]);
  useEffect(() => {
    fetchData(`https://locastic-server.herokuapp.com/workshops?&_limit=3&_sort=date&_order=desc&title_ne=${workshop.title}&category=${workshop.category}`).then((response) => {
      setRecomended(response);
    });
  }, [workshop]);
  return (
    <>
      {workshop.id == null ? (
        <ThreeDots color="#0097CC" height={80} width={80} wrapperStyle={{ marginTop: "120px", justifyContent: "center" }} />
      ) : (
        <>
          <div className="workshop-container">
            <div className="back-button">
              <BackButton />
            </div>
            <div className="workshop-body">
              <WorkshopImages image={workshop.imageUrl} />
              <div className="workshop-info-container">
                <WorkshopInfo workshop={workshop} />
                <Cart workshop={workshop} />
              </div>
            </div>
          </div>
          <div className="recomended">
            <h1>Slične radionice</h1>
            <div className="recomended-card">
              {recomended.map((item, index) => (
                <WorkshopCard workshop={item} key={item.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Workshop;
