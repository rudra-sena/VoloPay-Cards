import axios from "axios";
import { useState, useEffect } from "react";

//Custom hook to perform fetch calls
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Abort controller for cleanup function
    const abortFetch = new AbortController();
    setLoading(true);
    axios
      .get(url, {
        signal: abortFetch.signal,
      })
      .then((res) => {
        setData(res.data);
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
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
