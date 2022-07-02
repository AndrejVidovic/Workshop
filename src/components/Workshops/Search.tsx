import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Search.css'

type InitalValues = {
    value: string
}
const Search = ({ setSearchWorkshops, itemsToFilter}) => {
    const filter: InitalValues = {
        value: ""
    }
    function HandleChange(event) {
        const value = event.target.value;
        let tempFilteredItems = [];
        let searchWord = value.toLowerCase();
        if (searchWord!="") {
            tempFilteredItems =itemsToFilter.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))
        }
        else {
            tempFilteredItems = itemsToFilter; 
        }
        setSearchWorkshops(tempFilteredItems);
    }
    return (
        <div className='search-field'>
            <span ><FontAwesomeIcon icon={faSearch} size="lg"/></span>
            <input
                id="search_box"
                name="search"
                placeholder="Pretraži..."
                type="text"
                autoComplete='off'
                onChange={HandleChange}
            >
            </input>
        </div>
    )
}
export default Search;