import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush, faBolt, faCode, faDisplay, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./Filter.css";

const fetchOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};
const icons = [faBolt, faCode, faDisplay, faPaintBrush];
const CategoryFilter = ({ itemsToFilter, setFiltersWorkshops }) => {
  const [categories, setCategories] = useState([]);
  const [filtersCategories, setFiltersCategories] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://locastic-server.herokuapp.com/categories`, fetchOptions);
      const data = await res.json();
      setCategories(data);
    };
    getData();
  }, []);
  useEffect(() => {
    let tempFilteredCategories = [];
    tempFilteredCategories = itemsToFilter.filter((item) => filtersCategories.includes(item.category));
    if (filtersCategories.length === 0) {
      tempFilteredCategories = itemsToFilter;
    }
    if (window.innerWidth < 600) {
      setOpen(!open);
    }
    setFiltersWorkshops(tempFilteredCategories);
  }, [filtersCategories]);

  function HandleChange(category) {
    if (!filtersCategories.includes(category)) {
      setFiltersCategories([...filtersCategories, category]);
    } else {
      setFiltersCategories(filtersCategories.filter((temp) => temp !== category));
    }
  }
  const HandleOpenHamburger = () => {
    setOpen(!open);
  };
  return (
    <>
      <p className="theme-title">Filtriraj po temi</p>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className={`category ${filtersCategories.includes(category) ? "active" : null}`} key={index} onClick={(e) => HandleChange(category)}>
            <FontAwesomeIcon icon={icons[index]} size="lg"></FontAwesomeIcon>
            <p style={{ paddingLeft: "0.5rem" }}>{category}</p>
          </div>
        ))}
      </div>
      <div className="categories-container-small">
        <div className="selected-categories">
          <FontAwesomeIcon icon={faAngleDown} size="lg" onClick={HandleOpenHamburger}></FontAwesomeIcon>
          {filtersCategories.map((item) => (
            <p key={item} onClick={(e) => HandleChange(item)}>
              {item}
            </p>
          ))}
        </div>
        {open && (
          <div>
            {categories.map((category, index) => (
              <div className={`category ${filtersCategories.includes(category) ? "active" : null}`} key={index} onClick={(e) => HandleChange(category)}>
                <FontAwesomeIcon icon={icons[index]} size="lg"></FontAwesomeIcon>
                <p style={{ paddingLeft: "0.5rem" }}>{category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default CategoryFilter;
