import "./request.css";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../App";

import { Link, useParams } from "react-router-dom";
import ContentTop from "../ContentTop/ContentTop";
import "../orders/order.css";
import moment from "moment-timezone";
const RequestLogs = () => {
  const { route, setLoader } = useContext(AppContext);
  const { id } = useParams();
  const [Logs, setLogs] = useState([]);
  useEffect(() => {
    setLoader(true);
    fetch(`${route}/notification/requestNoti/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLogs(data.data);
      })
      .finally(() => setLoader(false));
  }, [route]);

  return (
    <div className="request-card">
      <ContentTop headTitle="Request logs" />
      <h1 style={{ margin: "20px", textAlign: "center" }}>Request logs</h1>

      <div className="container">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Log</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {Logs?.map((log) => {
                return (
                  <tr key={log.id}>
                    <td>{log.message}</td>
                    <td>{moment(log.createdAt).tz("Asia/Dubai").format()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>{" "}
      </div>
    </div>
  );
};

export default RequestLogs;
