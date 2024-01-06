import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

const ContentTop = ({ headTitle }) => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [notRead, setNotRead] = useState(0);
  const { notifications } = useContext(AppContext);
  useEffect(() => {
    const count = notifications?.filter((notification) => {
      return notification.isRead === false;
    })?.length;
    if (count) setNotRead(count);
  }, [notifications]);
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <img src={iconsImgs.menu} alt="" />
        </button>
        <h3 className="content-top-title">{headTitle}</h3>
      </div>
      <div className="content-top-btns">
        {sessionStorage.getItem("role") === "employee" && (
          <Link to="/notifications" className="notification">
            <img src={iconsImgs?.bell} alt="" />
            <span>
              {notRead > 0 && <span className="not-read">{notRead}</span>}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContentTop;
