import { useEffect, useState } from "react";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import logo from "../../assets/logo.png";
const Sidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const { login, setLogin, employee } = useContext(AppContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);
  const logOut = () => {
    sessionStorage.clear();
    setLogin(false);
  };

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={logo} alt="" />
        </div>
        <span className="info-name">
          {sessionStorage.getItem("name") && sessionStorage.getItem("name")}
        </span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {login ? (
            <>
              <li className="nav-item">
                <NavLink to="/" onClick={logOut} className={`nav-link `}>
                  <BsFillArrowRightSquareFill />
                  <span className="nav-link-text">Log Out</span>
                </NavLink>
              </li>

              {employee ? (
                <>
                  <li className="nav-item">
                    <NavLink to={`/employer-requests`} className={`nav-link `}>
                      <BsFillArrowRightSquareFill />
                      <span className="nav-link-text">My Requests</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`/users`} className={`nav-link `}>
                      <BsFillArrowRightSquareFill />
                      <span className="nav-link-text">Users</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                navigationLinks.map((navigationLink) => (
                  <li className="nav-item" key={navigationLink.id}>
                    <NavLink
                      to={`${navigationLink.title}`}
                      className={`nav-link`}
                    >
                      <BsFillArrowRightSquareFill />
                      <span className="nav-link-text">
                        {navigationLink.title}
                      </span>
                    </NavLink>
                  </li>
                ))
              )}
            </>
          ) : (
            <li className="nav-item">
              <NavLink to="/" className={`nav-link `}>
                <BsFillArrowRightSquareFill />
                <span className="nav-link-text">Login</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
