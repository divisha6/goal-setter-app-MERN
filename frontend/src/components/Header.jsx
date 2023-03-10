import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        {/* login button */}
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>

        {/* register button */}
        <li>
          <Link to="/register">
            <FaUserAlt />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
