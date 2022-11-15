import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { search, updateFilterApplied } from "../../Redux/cardSlice";
import Search from "./search.svg";
import filterSVG from "./filter.svg";
import "./PageHeader.css";
import FilterModal from "../FilterModal/FilterModal";

const PageHeader = () => {
  //Search filter state and handling
  const [searchInput, setSearchInput] = useState("");
  const [filterClicked, setFilterClicked] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    dispatch(updateFilterApplied(true));
    dispatch(search(searchInput));
  }, [searchInput]);

  return (
    <>
      <div className="page-header">
        <div className="search-container">
          <div>
            <img src={Search} alt="search" />
          </div>
          <div>
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        </div>
        <div className="btn-filter">
          <div>
            <button onClick={() => setFilterClicked(!filterClicked)}>
              <img src={filterSVG} />
              Filter
            </button>
          </div>
        </div>
      </div>
      <FilterModal
        filterClicked={filterClicked}
        setFilterClicked={setFilterClicked}
      />
    </>
  );
};

export default PageHeader;
