import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAllCards } from "../../Redux/cardSlice";
import Cards from "../../Components/Cards";

const AllCards = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const url = "cards.json";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  // const handleScroll = () => {
  //   const masterDiv = document.getElementById("master");
  //   if (masterDiv.getBoundingClientRect().bottom <= window.innerHeight) {
  //     if (page < 9) {
  //       setPage(page + 1);
  //     }
  //   }
  // };
  document.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (page < 9) {
        setPage(page + 1);
      }
    }
  });
  const handlePagination = (cardData) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = cardData.slice(startIndex, endIndex);
    dispatch(updateAllCards(result));
  };

  useEffect(() => {
    //document.addEventListener("scroll", handleScroll);
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

  const cards = useSelector((state) => state.card.allCards);
  console.log(cards);

  return (
    <div id="master">
      {loading && <div className="loader">Loading...</div>}
      {error && <h2>{error}</h2>}
      {cards && <Cards cards={cards} />}
    </div>
  );
};

export default AllCards;
