import { Link } from "react-router-dom";
import "./Navbar.css";
import img from "../../img/Logo.webp";

const Navbar = () => {
  return (
    <div id="navbar">
      <img src={img} alt="Logo" />
      <ul className="navbar-list">
        <li className="navbar-client">
          <Link to="/PremiumTutors/client">Client Profile</Link>
        </li>
        <li className="navbar-tutor">
          <Link to="/PremiumTutors/tutor">Tutor Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
