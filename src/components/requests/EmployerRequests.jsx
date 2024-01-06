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
        if (data.data) {
          setrRquests(data.data);
        }
      });
  }, [refresh]);
  return (
    <div className="requests">
      <ContentTop headTitle="Employer Requests" />

      <h2>All Requests</h2>
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
                  <Link to={`/request/${item.title}/${item.id}`}>Details</Link>
                  <Link to={`/request-progress/${item.title}/${item.id}`}>
                    Progress
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployerRequests;
