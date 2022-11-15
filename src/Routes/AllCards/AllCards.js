import axios from "axios";
import { useState, useEffect } from "react";
import { updateAllCards, updateFilterApplied } from "../../Redux/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../../Components/PageHeader/PageHeader";
import Cards from "../../Components/Cards";
import Loading from "../../Components/Loading/Loading";

const AllCards = () => {
  //Pagination States
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  //Fetch Data handling States
  const url = "cards.json";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const dispatch = useDispatch();

  //Pagination and Updating cards after Fetch
  const handlePagination = (cardData) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = cardData.slice(startIndex, endIndex);
    dispatch(updateAllCards(result));
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
        dispatch(updateFilterApplied(false));
        handlePagination(res.data);
        setHasMore(allCards.length < res.data.length);
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

  //Card Data from Redux
  const allCards = useSelector((state) => state.card.allCards);
  const filteredCards = useSelector((state) => state.card.filteredCards);
  const removeDuplicateCards = [...new Set(filteredCards)];
  return (
    <div className="all-cards">
      <PageHeader />
      {loading && <Loading />}
      {error && <h2>{error}</h2>}
      {allCards && (
        <Cards
          cards={removeDuplicateCards}
          loading={loading}
          hasMore={hasMore}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default AllCards;
