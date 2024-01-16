import { useContext, useEffect, useState } from "react";
import ContentTop from "../ContentTop/ContentTop";
import { AppContext } from "../../App";
import "./order.css";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
const Orders = () => {
  const { setLoader, route } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payed, setPayed] = useState("true");
  const [reFresh, setReFresh] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(`${route}/order/${payed}`, {
      method: "POST",
      body: JSON.stringify({
        startDate,
        endDate,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, [reFresh, route, setLoader]);
  console.log(orders);
  return (
    <>
      <ContentTop headTitle="All Orders" />
      <div className="table-container">
        <form
          className="filter-from"
          onSubmit={(e) => {
            e.preventDefault();
            setReFresh((prev) => prev + 1);
          }}
        >
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate">Is payed</label>
            <select value={payed} onChange={(e) => setPayed(e.target.value)}>
              <option value="true">yes</option>
              <option value="false">no</option>
            </select>
          </div>

          <button>Filter</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Paid</th>
              <th>total price</th>
              <th>created at</th>
              <th>paid at</th>
              <th>request type </th>
              <th>order type </th>
              <th>request details </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.isPaid ? "yes" : "no"}</td>
                <td>{order.totalOrderPrice}</td>
                <td>
                  {moment(order.createdAt)
                    .tz("Asia/Dubai")
                    .format("YYYY-MM-DD HH:mm")}
                </td>
                <td>
                  {moment(order.paidAt)
                    .tz("Asia/Dubai")
                    .format("YYYY-MM-DD HH:mm")}
                </td>
                <td>{order.requestType}</td>
                <td>{order.type}</td>
                <td>
                  <Link
                    to={`/request-progress/${order.requestType}/${order.requestId}`}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
