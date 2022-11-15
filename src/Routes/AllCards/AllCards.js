import axios from "axios";
import { useState, useEffect } from "react";
import Search from "./search.svg";
import Cards from "../../Components/Cards";
import {
  updateAllCards,
  updateFilteredCards,
  filter,
  search,
} from "../../Redux/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import "./AllCards.css";

const AllCards = () => {
  const cardTypes = [
    { type: "BURNER", typeValue: "Burner" },
    { type: "SUBSCRIPTION", typeValue: "Subscription" },
  ];
  //Pagination States
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  //Fetch Data handling States
  const url = "cards.json";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //Filter-Menu handling States
  const [filterClicked, setFilterClicked] = useState(false);
  const [hideDropdown, setDropdown] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState("Select Cardholder");
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdown(!hideDropdown);
  };
  const onChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const onSelectHandler = (e) => {
    setSelected(e.target.innerText);
  };
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }
  const handleCheck = (e) => {
    const { value } = e.target;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handlePagination = (cardData) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = cardData.slice(startIndex, endIndex);
    dispatch(updateAllCards(result));
  };
  const filterCards = (cards) => {
    const tempFilter = cards.filter((card) => {
      return card.name.toLowerCase().includes(searchInput);
    });
    dispatch(updateFilteredCards(tempFilter));
  };

  const handleFilterApply = () => {
    dispatch(filter([checked, selected]));
    setFilterClicked(!filterClicked);
    setChecked([]);
    setSelected("Select Cardholder");
  };

  useEffect(() => {
    //Abort controller for cleanup function
    const abortFetch = new AbortController();
    setLoading(true);
    axios
      .get(url, {
        signal: abortFetch.signal,
      })
      .then((res) => {
        handlePagination(res.data);
      })
      .catch((err) => {
        if (!(err.name === "CanceledError")) {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => abortFetch.abort(); //Fetch aborted when component unmounts
  }, [page]);
  useEffect(() => {
    dispatch(search(searchInput));
  }, [searchInput]);

  const allCards = useSelector((state) => state.card.allCards);
  const filteredCards = useSelector((state) => state.card.filteredCards);
  const allCardOwners = allCards.map((card) => card.owner);
  const cardOwners = removeDuplicates(allCardOwners);

  return (
    <div className="all-cards">
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
      {filterClicked && (
        <div className="filter-modal-container">
          <div className="filter-label">Filters</div>
          <div className="filter-container">
            <div className="type-label">Type</div>
            <div className="filter-type">
              {cardTypes.map((type) => {
                return (
                  <>
                    <div>
                      <input
                        type="checkbox"
                        id="burner"
                        name="type-filter"
                        value={type.type}
                        onChange={(e) => handleCheck(e)}
                      />
                    </div>
                    <div>
                      <label for="burner">{type.typeValue}</label>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="select-label">Cardholder</div>
            <div className="select-container" onClick={toggleDropdown}>
              <div className="select">{selected}</div>
              <div className={`select-dropdown ${hideDropdown && "hide"}`}>
                {cardOwners.map((cardOwner) => {
                  return (
                    <div onClick={(e) => onSelectHandler(e)}>{cardOwner}</div>
                  );
                })}
              </div>
            </div>
            <div className="modal-button">
              <div>
                <button className="apply" onClick={handleFilterApply}>
                  Apply
                </button>
              </div>
              <div>
                <button
                  className="clear"
                  onClick={() => setFilterClicked(!filterClicked)}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <div className="loader">Loading...</div>}
      {error && <h2>{error}</h2>}
      {allCards && <Cards cards={filteredCards} />}
    </div>
  );
};

export default AllCards;
