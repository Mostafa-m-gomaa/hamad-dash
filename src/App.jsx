import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar/Sidebar";
import ContentTop from "./components/ContentTop/ContentTop";
import { createContext, useEffect, useState } from "react";
import Login from "./components/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Requests from "./components/requests/Requests";
import RequestCard from "./components/request-card/RequestCard";
import Users from "./components/users/Users";
import Employers from "./components/users/employers";
import EmployerRequests from "./components/requests/EmployerRequests";
import RequestProgress from "./components/request-card/RequestProgress";

export const AppContext = createContext();

function App() {
  const [headTitle, setHeadTitle] = useState("تسجيل الدخول");
  const [login, setLogin] = useState(false);
  const [route, setRoute] = useState("https://api.hamad-edu.com/api/v1");
  const [employee, setEmployee] = useState(false);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLogin(sessionStorage.getItem("login"));
    if (sessionStorage.getItem("role") === "employee") {
      setEmployee(true);
    } else {
      setEmployee(false);
    }
  }, [login]);
  return (
    <AppContext.Provider
      value={{
        headTitle,
        setHeadTitle,
        route,
        login,
        setLogin,
        setLoader,
        employee,
        setEmployee,
      }}
    >
      <>
        <div className="app">
          <ToastContainer />
          {loader ? (
            <div className="loader-cont">
              <div className="banter-loader">
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
              </div>
            </div>
          ) : null}
          <Sidebar />
          <div className="the-content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/employers" element={<Employers />} />
              <Route path="/employer-requests" element={<EmployerRequests />} />
              <Route
                path="/employer-requests/:id"
                element={<EmployerRequests notMine={true} />}
              />
              <Route path="/requests" element={<Requests />} />
              <Route path="/request/:type/:id" element={<RequestCard />} />
              <Route
                path="/request-progress/:type/:id"
                element={<RequestProgress />}
              />
            </Routes>
          </div>
        </div>
      </>
    </AppContext.Provider>
  );
}

export default App;
