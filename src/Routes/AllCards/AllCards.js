import { useSelector, useDispatch } from "react-redux";
import { updateAllCards } from "../../Redux/cardSlice";

const AllCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.allCards);
  dispatch(updateAllCards());
  console.log(cards);

  return <>All Cards</>;
};

export default AllCards;
