import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
import "./requests.css";
import ContentTop from "../ContentTop/ContentTop";
import { Link } from "react-router-dom";

const Requests = () => {
  const { route, setLoader } = useContext(AppContext);
  const [master, setMaster] = useState([]);
  const [phd, setPhd] = useState([]);
  const [bechlor, setBechlor] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [requestId, setRequestId] = useState("");
  const [userId, setUserId] = useState("");
  const [empId, setEmpId] = useState("");
  const [showEmp, setShowEmp] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const clickAssign = (req, user, emp) => {
    setRequestId(req);
    setUserId(user);
    setShowEmp(true);
    if (emp) {
      setEmpId(emp);
    }
  };
  const assignEmp = (id) => {
    setEmpId(id);
  };
  const assign = () => {
    setLoader(true);
    setShowEmp(false);
    fetch(`${route}/crm/assign`, {
      method: "PUT",
      body: JSON.stringify({
        requestId: requestId,
        employeeId: empId,
        userId: userId,
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmpId("");
        setLoader(false);
        if (data.status === "success") {
          toast.success("Assigned Successfully");
          setRefresh(!refresh);
        }
      });
  };
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
  }, [refresh, route, keyword]);
  useEffect(() => {
    fetch(`${route}/users/employee`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setEmployees(data.data);
        }
      });
  }, []);
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

      {showEmp ? (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("emps-container")) {
              setShowEmp(false);
            }
          }}
          className="emps-container"
        >
          <div className="emps">
            <h2>Choose Employee</h2>
            {employees.map((item, index) => {
              return (
                <div
                  className={item.id === empId ? "emp emp-active" : "emp"}
                  onClick={() => assignEmp(item.id)}
                  key={index}
                >
                  <div>{item.username}</div>
                  <div>{item.email}</div>
                </div>
              );
            })}
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button onClick={assign} style={{ margin: "0" }}>
                Assign
              </button>
              <button
                style={{ margin: "0" }}
                onClick={() => {
                  setShowEmp(false);
                }}
              >
                Close
              </button>
            </div>{" "}
          </div>
        </div>
      ) : null}
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
                className={`${item.Eligibility === "pending" && "pending"} ${
                  item.Eligibility !== "pending" && !item.employeeId && "noEmp"
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
                  {item.Eligibility !== "eligible" && (
                    <button onClick={() => acceptRequest(item.title, item.id)}>
                      Accept
                    </button>
                  )}
                  <Link to={`/request/${item.title}/${item.id}`}>Details</Link>

                  {item.Eligibility !== "pending" && (
                    <>
                      <button
                        onClick={() =>
                          clickAssign(item.id, item.UserId, item?.employeeId)
                        }
                      >
                        Assign to emp
                      </button>
                      <Link to={`/request-progress/${item.title}/${item.id}`}>
                        progress
                      </Link>
                    </>
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
                className={`${item.Eligibility === "pending" && "pending"} ${
                  item.Eligibility !== "pending" && !item.employeeId && "noEmp"
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
                  {item.Eligibility !== "eligible" && (
                    <button onClick={() => acceptRequest(item.title, item.id)}>
                      Accept
                    </button>
                  )}
                  <Link to={`/request/${item.title}/${item.id}`}>Details</Link>

                  {item.Eligibility !== "pending" && (
                    <>
                      <button
                        onClick={() =>
                          clickAssign(item.id, item.UserId, item?.employeeId)
                        }
                      >
                        Assign to emp
                      </button>
                      <Link to={`/request-progress/${item.title}/${item.id}`}>
                        progress
                      </Link>
                    </>
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
                className={`${item.Eligibility === "pending" && "pending"} ${
                  item.Eligibility !== "pending" && !item.employeeId && "noEmp"
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
                  {item.Eligibility !== "eligible" && (
                    <button onClick={() => acceptRequest(item.title, item.id)}>
                      Accept
                    </button>
                  )}
                  <Link to={`/request/${item.title}/${item.id}`}>Details</Link>

                  {item.Eligibility !== "pending" && (
                    <>
                      <button
                        onClick={() =>
                          clickAssign(item.id, item.UserId, item?.employeeId)
                        }
                      >
                        Assign to emp
                      </button>
                      <Link to={`/request-progress/${item.title}/${item.id}`}>
                        progress
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
