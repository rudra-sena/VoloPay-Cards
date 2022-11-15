import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../Redux/cardSlice";
import Search from "./search.svg";
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
          <button onClick={() => setFilterClicked(!filterClicked)}>
            Filter
          </button>
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
