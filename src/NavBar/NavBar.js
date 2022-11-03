import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="header">
        <Link to="/your-cards">
          <div>
            <button className="nav-btn" onClick>
              Your
            </button>
          </div>
        </Link>
        <Link to="/">
          <div>
            <button className="nav-btn" onClick>
              All
            </button>
          </div>
        </Link>
        <Link to="/blocked-cards">
          <div>
            <button className="nav-btn" onClick>
              Blocked
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
