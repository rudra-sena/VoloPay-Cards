import "./Card.css";
import Burner from "./burner.svg";
import Refresh from "./refresh.svg";

const Card = ({ card }) => {
  return (
    <>
      <div className="card-wrapper">
        <div className="card-container">
          <div className="card-header">
            <div className="card-header-details">
              <div className="card-name">{card.name}</div>
              <div className="card-description">
                {card.owner} &#x2022; {card.budget_name}
              </div>
            </div>
            <div className="card-logo">
              {card.card_type === "BURNER" && <img src={Burner} alt="Logo" />}
              {card.card_type === "SUBSCRIPTION" && (
                <img
                  style={{ height: "20px", width: "20px", padding: "7px" }}
                  src={Refresh}
                  alt="Logo"
                />
              )}
            </div>
          </div>
          <div className="card-details">
            <div className="card-type">{card.card_type}</div>
            {card.card_type === "BURNER" && (
              <div className="card-expiry">Expires: {card.expiry}</div>
            )}
            {card.card_type === "SUBSCRIPTION" && (
              <div className="card-expiry">
                {card.month} Limit: {card.limit}
              </div>
            )}
          </div>
          <div className="card-progress-bar">
            <progress
              value={card.spent.value}
              max={card.spent.value + card.available_to_spend.value}
            ></progress>
          </div>
          <div className="card-spent">
            <div className="spent">
              <div style={{ fontSize: "30px", color: "rgb(255, 0, 115)" }}>
                &#x2022;
              </div>{" "}
              Spent
            </div>
            <div className="amount">
              {card.spent.value} {card.spent.currency}
            </div>
          </div>
          <div className="card-available">
            <div className="available">
              <div style={{ fontSize: "30px", color: "darkGreen" }}>
                &#x2022;{" "}
              </div>
              Available to spend
            </div>
            <div className="amount-available">
              {card.available_to_spend.value} {card.available_to_spend.currency}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
