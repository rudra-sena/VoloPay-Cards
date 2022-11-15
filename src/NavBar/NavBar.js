import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="header">
        <Link to="/your-cards">
          <div className="btn-div">
            <button className="nav-btn">Your</button>
          </div>
        </Link>
        <Link to="/">
          <div className="btn-div">
            <button className="nav-btn">All</button>
          </div>
        </Link>
        <Link to="/blocked-cards">
          <div className="btn-div">
            <button className="nav-btn">Blocked</button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
