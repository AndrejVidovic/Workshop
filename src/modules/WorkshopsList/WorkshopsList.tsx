import CategoryFilter from "../../components/Workshops/Filter";
import { useState, useEffect } from "react";
import WorkshopCard from "../../components/Workshops/WorkshopCard";
import Search from "../../components/Workshops/Search";
import WorkshopCardSmall from "../../components/Workshops/WorkshopCardSmall";
import { ThreeDots } from "react-loader-spinner";
import "./WorkshopsList.css";

const fetchOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};
const pageLimit = 9;
const Workshops = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsToFilter, setItemsToFilter] = useState([]);
  const [searchWorkshops, setSearchWorkshops] = useState([]);
  const [filtersWorkshops, setFiltersWorkshops] = useState([]);
  const [numberOfWorkshops, setNumberOfWorkshop] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://server-workshop.vercel.app/workshops?&_limit=${pageLimit * currentPage}&_sort=date&_order=desc`, fetchOptions);
      const data = await res.json();
      setNumberOfWorkshop(parseInt(res.headers.get("X-Total-Count")));
      setItemsToFilter(data);
      setFiltersWorkshops(data);
      setSearchWorkshops(data);
    };
    getData();
  }, [currentPage]);

  function getPaginatedWorkshops() {
    let filteredWorkshops = [];
    for (let i = 0; i < filtersWorkshops.length; i++) {
      for (let j = 0; j < searchWorkshops.length; j++) {
        if (filtersWorkshops[i].title === searchWorkshops[j].title) {
          filteredWorkshops.push(filtersWorkshops[i]);
        }
      }
    }
    let allUniqueWorkshops = [...new Set(filteredWorkshops)];
    return allUniqueWorkshops;
  }
  const HandleClick = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      {itemsToFilter.length === 0 ? (
        <ThreeDots color="#0097CC" height={80} width={80} wrapperStyle={{ marginTop: "120px", justifyContent: "center" }} />
      ) : (
        <div className="workshops-container">
          <div className="category-filter">
            <CategoryFilter itemsToFilter={itemsToFilter} setFiltersWorkshops={setFiltersWorkshops} />
          </div>
          <div>
            <div className="workshops-header-container">
              <div className="workshops-header">
                <h1>Sve radionice</h1>
                <p>Broj radionica: {numberOfWorkshops}</p>
              </div>
              <Search setSearchWorkshops={setSearchWorkshops} itemsToFilter={itemsToFilter} />
            </div>
            <div className="workshops-body-container">{window.innerWidth < 600 ? getPaginatedWorkshops().map((workshop) => <WorkshopCardSmall workshop={workshop} key={workshop.id} />) : getPaginatedWorkshops().map((workshop) => <WorkshopCard workshop={workshop} key={workshop.id} />)}</div>
            <div className="load-button-container">
              <button onClick={HandleClick} className="load-more">
                Učitaj više
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Workshops;
