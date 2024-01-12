import { useContext, useState } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NextStep = ({ setRefresh, withNumber }) => {
  const [totalOrderPrice, setTotalOrderPrice] = useState("");
  const [isSubmiting, setIsSumbting] = useState(false);
  const { route, setLoader } = useContext(AppContext);

  const params = useParams();
  const onNextStep = () => {
    setLoader(true);
    fetch(`${route}/progress/nextStep/${params.id}/${params.type}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: withNumber
        ? JSON.stringify({
            totalOrderPrice: +totalOrderPrice,
          })
        : null,
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(res.msg);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoader(false);
        setIsSumbting(false);
      });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSumbting(true);
        }}
      >
        {withNumber && (
          <>
            <label htmlFor="totalOrderPrice" style={{ paddingRight: "20px" }}>
              Total Order Price (of next step) :
            </label>
            <input
              type="number"
              id="totalOrderPrice"
              required
              onChange={(e) => setTotalOrderPrice(e.target.value)}
            />
          </>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button type="submit" style={{ margin: "10px" }}>
            Next
          </button>
        </div>
      </form>{" "}
      {isSubmiting && (
        <div className="confirm">
          <div>are you sure ?</div>
          <div className="btns">
            <button onClick={onNextStep} className="yes">
              Yes
            </button>
            <button onClick={() => setIsSumbting(false)} className="no">
              No
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default NextStep;
