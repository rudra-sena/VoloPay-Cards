import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filter, updateFilterApplied } from "../../Redux/cardSlice";
import arrow from "./arrow.svg";
import "./FilterModal.css";

const FilterModal = ({ filterClicked, setFilterClicked }) => {
  //Filter-Menu handling States
  const [hideDropdown, setDropdown] = useState(true);
  const [checked, setChecked] = useState([]);
  const [selected, setSelected] = useState("Select Cardholder");
  const cardTypes = [
    { type: "BURNER", typeValue: "Burner" },
    { type: "SUBSCRIPTION", typeValue: "Subscription" },
  ];
  const dispatch = useDispatch();
  //Functions to handle filter states
  const toggleDropdown = () => {
    setDropdown(!hideDropdown);
  };
  const onSelectHandler = (e) => {
    setSelected(e.target.innerText);
  };
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

  const handleFilterApply = () => {
    dispatch(updateFilterApplied(true));
    dispatch(filter([checked, selected]));
    setFilterClicked(!filterClicked);
    setChecked([]);
    setSelected("Select Cardholder");
  };

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  //Card Data from Redux
  const allCards = useSelector((state) => state.card.allCards);
  const allCardOwners = allCards.map((card) => card.owner);
  const cardOwners = removeDuplicates(allCardOwners);

  return (
    <>
      {filterClicked && (
        <div className="filter-modal-container">
          <div className="filter-label">Filters</div>
          <div className="filter-container">
            <div className="type-label">Type</div>
            <div className="filter-type">
              {cardTypes.map((type) => {
                return (
                  <div key={type.type}>
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
                      <label htmlFor="burner">{type.typeValue}</label>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="select-label">Cardholder</div>
            <div className="select-container" onClick={toggleDropdown}>
              <div className="select">
                {selected}
                <img src={arrow} />
              </div>

              <div className={`select-dropdown ${hideDropdown && "hide"}`}>
                {cardOwners.map((cardOwner) => {
                  return (
                    <div key={cardOwner} onClick={(e) => onSelectHandler(e)}>
                      {cardOwner}
                    </div>
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
    </>
  );
};

export default FilterModal;
