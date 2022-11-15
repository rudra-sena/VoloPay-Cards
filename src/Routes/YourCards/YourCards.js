import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../Components/Cards";

const YourCards = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const url = "cards.json";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [yourCards, setYourCards] = useState([]);
  // const handleScroll = () => {
  //   const masterDiv = document.getElementById("master");
  //   if (masterDiv.getBoundingClientRect().bottom <= window.innerHeight) {
  //     if (page < 9) {
  //       setPage(page + 1);
  //     }
  //   }
  // };
  const handlePagination = (cards) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = cards.slice(startIndex, endIndex);
    setYourCards(result);
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
        const yourCards = res.data.filter((card) => {
          return card.owner == process.env.REACT_APP_CURRENT_USER;
        });
        handlePagination(yourCards);
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

  return (
    <div id="master">
      {loading && <div className="loader">Loading...</div>}
      {error && <h2>{error}</h2>}
      {yourCards && <Cards cards={yourCards} />}
    </div>
  );
};

export default YourCards;
