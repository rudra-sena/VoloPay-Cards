import { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import Card from "./Card/Card";

const Cards = ({ cards, loading, hasMore, setPage }) => {
  const styles = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
  };

  const filterApplied = useSelector((state) => state.card.filterApplied);
  //Check for last element
  const observer = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      console.log("Visited", node);
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //Check for last element only if Filters are not applied
  return (
    <>
      <div className="card-grid" style={styles}>
        {cards.map((card, index) => {
          if (cards.length === index + 1 && !filterApplied) {
            return (
              <div ref={lastCardRef} key={index}>
                <Card card={card} />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <Card card={card} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Cards;
