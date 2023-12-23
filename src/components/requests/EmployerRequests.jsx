import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "./requests.css";
import { Link, useParams } from "react-router-dom";
import RequestItem from "./RequestItem";

const EmployerRequests = ({ notMine }) => {
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
  const id = useParams();
  useEffect(() => {
    fetch(`${route}${notMine ? `/crm/${id.id}/requests` : `/crm/myRequests`}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setBechlor(data.data);
        }
      });
  }, [refresh]);
  useEffect(() => {
    fetch(`${route}/users/employees`, {
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
  return (
    <div className="requests">
      <h1>All Requests</h1>
      <div className="bachelor">
        <h2>bachelor</h2>
        <div className="req-container">
          {bechlor.map((item, index) => {
            return (
              <RequestItem
                key={index}
                item={item}
                index={index}
                type={"bechlor"}
                isEmployerView={true}
              />
            );
          })}
        </div>
      </div>
      <div className="master">
        <h2>master</h2>
        <div className="req-container">
          {master.map((item, index) => {
            return (
              <RequestItem
                key={index}
                item={item}
                index={index}
                type={"master"}
                isEmployerView={true}
              />
            );
          })}
        </div>
      </div>
      <div className="phd">
        <h2>phd</h2>
        <div className="req-container">
          {phd.map((item, index) => {
            return (
              <RequestItem
                key={index}
                item={item}
                index={index}
                type={"phd"}
                isEmployerView={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployerRequests;
