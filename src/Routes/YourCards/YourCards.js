import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "../../Components/Cards";

const YourCards = () => {
  const url = "cards.json";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [yourCards, setYourCards] = useState([]);

  useEffect(() => {
    //Abort controller for cleanup function
    const abortFetch = new AbortController();
    setLoading(true);
    axios
      .get(url, {
        signal: abortFetch.signal,
      })
      .then((res) => {
        const tempFilter = res.data.filter((card) => {
          return card.owner === process.env.REACT_APP_CURRENT_USER;
        });
        setYourCards(tempFilter);
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
  }, []);

  return (
    <div id="master">
      {loading && <div className="loader">Loading...</div>}
      {error && <h2>{error}</h2>}
      {yourCards && <Cards cards={yourCards} />}
    </div>
  );
};

export default YourCards;
