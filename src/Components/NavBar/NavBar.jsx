import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const NavBar = ({items}) => {
  let navigate = useNavigate()
  return (
    <nav
      className={`${style.Nav} bg-secondary border border-secondary fixed-top d-flex align-items-center px-5 py-2 justify-content-between`}
    >
      <div className={`align-items-center d-flex`}>
        <img className={`${style.icon}`} src="./Asserts/logo.png" alt="" />
        <h3 onClick={()=>{ navigate('/') }} role='button' className={`d-inline-block ms-3 text-white`}>SA Machineries</h3>
      </div>
      <div className={`d-flex`}>
        <ul className={`nav justify-content-center gap-4`}>
          <li>
            <Link
              className={`nav-item fs-5 text-white text-dark text-decoration-none`}
              to="/"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={`nav-item fs-5 text-white text-dark text-decoration-none`}
              to="/contact"
            >
              Contact Us
            </Link>
          </li>
          <li className={`nav-item mt-1`}>
            <Link to="/cart">
                <div className={`position-relative`}>
              <img
                className={`${style.icon} ms-2`}
                src="./Asserts/bag.png"
                alt=""
              />
              <span className="position-absolute start-25 translate-middle badge mt-3 rounded-pill bg-danger">

                {items}
              </span>
                </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
