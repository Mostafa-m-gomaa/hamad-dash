import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { toast } from "react-toastify";

const OrderTabel = () => {
  const [orders, setOrders] = useState([]);
  const { setLoader, route } = useContext(AppContext);
  const [refresh, setRefresh] = useState(0);
  const params = useParams();
  useEffect(() => {
    setLoader(true);
    fetch(`${route}/order/${params.id}/${params.type}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.requestOrders);
        console.log(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, [refresh, route, params.id, params.type, setLoader]);
  const onPay = (id) => {
    setLoader(true);
    fetch(`${route}/order/${id}/setAsPaied`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRefresh((prev) => prev + 1);

        toast.success(res.message);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Paid</th>
            <th>total price</th> <th>created at</th>
            <th>paid at</th>
            <th>request type </th>
            <th>order type </th>
            <th>actions </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.isPaid ? "yes" : "no"}</td>
              <td>{order.totalOrderPrice}</td>{" "}
              <td>{new Date(order.createdAt).toDateString()}</td>
              <td>{new Date(order.paidAt).toDateString()}</td>
              <td>{order.requestType}</td>
              <td>{order.type}</td>
              <td>
                <button
                  disabled={order.isPaid}
                  onClick={() => {
                    onPay(order.id);
                  }}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTabel;
