import { useState } from "react";
import Card from "./Card/Card";

const Cards = ({ cards }) => {
  const styles = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
  };

  return (
    <>
      <div className="card-grid" style={styles}>
        {cards.map((card) => {
          return <Card card={card} />;
        })}
      </div>
    </>
  );
};

export default Cards;
