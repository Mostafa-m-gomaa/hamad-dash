import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "./requests.css";
import { Link, useParams } from "react-router-dom";
import ContentTop from "../ContentTop/ContentTop";

const EmployerRequests = ({ notMine }) => {
  const { route, setLoader } = useContext(AppContext);
  const [requests, setrRquests] = useState([]);
  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [master, setMaster] = useState([]);
  const [phd, setPhd] = useState([]);
  const [bechlor, setBechlor] = useState([]);
  const id = useParams();
  const acceptRequest = (type, id) => {
    setLoader(true);
    fetch(`${route}/${type}/${id}/eligibility`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Eligibility: "eligible",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        console.log(data);
        if (data.status === "fail") {
          toast.error(data.message);
        } else if (data.message === "Request status updated successfully") {
          toast.success("Request status updated successfully");
          setRefresh(!refresh);
        }
      });
  };
  useEffect(() => {
    if (notMine) {
      fetch(`${route}${notMine && `/crm/${id.id}/requests`}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setrRquests(data.data);
          }
        });
    } else {
      fetch(`${route}/bachelor${keyword ? `?keyword=${keyword}` : ""}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setBechlor(data.data);
          }
        });
      fetch(`${route}/master${keyword ? `?keyword=${keyword}` : ""}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setMaster(data.data);
          }
        });
      fetch(`${route}/phd${keyword ? `?keyword=${keyword}` : ""}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setPhd(data.data);
          }
        });
    }
  }, [refresh, keyword]);
  useEffect(() => {
    fetch(`${route}/countryOfStudy`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCountries(data.data);
        }
      });
    fetch(`${route}/service`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setServices(data.data);
        }
      });
  }, []);
  return (
    <div className="requests">
      <ContentTop headTitle="Employer Requests" />
      <h2>All Requests</h2>{" "}
      {!notMine && (
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "start",
            gap: "10px",
          }}
        >
          <label style={{ fontSize: "25px", fontWeight: "700" }}>
            Country :{" "}
          </label>
          <select
            style={{ padding: "10px" }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          >
            <option value="">all</option>
            {countries.map((item, index) => {
              return (
                <option key={index} value={item.title_en}>
                  {item.title_en} - {item.title_ar}
                </option>
              );
            })}
          </select>
          <label style={{ fontSize: "25px", fontWeight: "700" }}>
            Service :{" "}
          </label>
          <select
            value={keyword}
            style={{ padding: "10px" }}
            onChange={(e) => setKeyword(e.target.value)}
          >
            <option value="">all</option>
            {services.map((item, index) => {
              return (
                <option key={index} value={item.title_en}>
                  {item.title_en} - {item.title_ar}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {!notMine && (
        <>
          <h2>Bachelor</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Employee</th>
                <th>Current Step</th>
                <th>Eligiblility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bechlor.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      item.Eligibility === "pending" && "pending"
                    } ${
                      item.Eligibility !== "pending" &&
                      !item.employeeId &&
                      "noEmp"
                    } `}
                  >
                    <td>
                      {item?.UserDetails?.username} - {item?.UserDetails?.email}
                    </td>
                    <td>
                      {item?.employeeId ? (
                        <>
                          {item?.Employee?.username} - {item?.Employee?.email}
                        </>
                      ) : (
                        <>no employee</>
                      )}
                    </td>
                    <td>{item.currentStep}</td>
                    <td>{item.Eligibility}</td>
                    <td className="buttons">
                      <Link to={`/request/${item.title}/${item.id}`}>
                        Details
                      </Link>
                      <Link to={`/request-progress/${item.title}/${item.id}`}>
                        progress
                      </Link>{" "}
                      {item.Eligibility !== "eligible" && (
                        <button
                          onClick={() => acceptRequest(item.title, item.id)}
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Master</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Employee</th>
                <th>Current Step</th>
                <th>Eligiblility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {master.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      item.Eligibility === "pending" && "pending"
                    } ${
                      item.Eligibility !== "pending" &&
                      !item.employeeId &&
                      "noEmp"
                    } `}
                  >
                    <td>
                      {item?.UserDetails?.username} - {item?.UserDetails?.email}
                    </td>
                    <td>
                      {item?.employeeId ? (
                        <>
                          {item?.Employee?.username} - {item?.Employee?.email}
                        </>
                      ) : (
                        <>no employee</>
                      )}
                    </td>
                    <td>{item.currentStep}</td>
                    <td>{item.Eligibility}</td>
                    <td className="buttons">
                      <Link to={`/request/${item.title}/${item.id}`}>
                        Details
                      </Link>
                      <Link to={`/request-progress/${item.title}/${item.id}`}>
                        progress
                      </Link>{" "}
                      {item.Eligibility !== "eligible" && (
                        <button
                          onClick={() => acceptRequest(item.title, item.id)}
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>PHD</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Employee</th>
                <th>Current Step</th>
                <th>Eligiblility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {phd.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      item.Eligibility === "pending" && "pending"
                    } ${
                      item.Eligibility !== "pending" &&
                      !item.employeeId &&
                      "noEmp"
                    } `}
                  >
                    <td>
                      {item?.UserDetails?.username} - {item?.UserDetails?.email}
                    </td>
                    <td>
                      {item?.employeeId ? (
                        <>
                          {item?.Employee?.username} - {item?.Employee?.email}
                        </>
                      ) : (
                        <>no employee</>
                      )}
                    </td>
                    <td>{item.currentStep}</td>
                    <td>{item.Eligibility}</td>
                    <td className="buttons">
                      <Link to={`/request/${item.title}/${item.id}`}>
                        Details
                      </Link>
                      <Link to={`/request-progress/${item.title}/${item.id}`}>
                        progress
                      </Link>{" "}
                      {item.Eligibility !== "eligible" && (
                        <button
                          onClick={() => acceptRequest(item.title, item.id)}
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {notMine && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Current Step</th>
              <th>Eligiblility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {item?.UserDetails?.username} - {item?.UserDetails?.email}
                  </td>
                  <td>
                    {item?.employeeId ? (
                      <>
                        {item?.Employee?.username} - {item?.Employee?.email}
                      </>
                    ) : (
                      <>no employee</>
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.currentStep}</td>
                  <td>{item.Eligibility}</td>
                  <td className="buttons">
                    <Link to={`/request/${item.title}/${item.id}`}>
                      Details
                    </Link>
                    <Link to={`/request-progress/${item.title}/${item.id}`}>
                      Progress
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployerRequests;
