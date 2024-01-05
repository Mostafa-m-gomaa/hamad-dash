import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import { toast } from "react-toastify";

const ReceiveRegstrationFees = ({ setRefresh, isDone, requestDetails }) => {
  const { route, setLoader } = useContext(AppContext);
  const params = useParams();
  const { registrationFeesFile } = requestDetails;

  const onNextStep = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch(`${route}/progress/nextStep/${params.id}/${params.type}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success(res.msg);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoader(false));
  };
  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive Registration Fees</h2>

      <form onSubmit={onNextStep}>
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
          <button
            disabled={registrationFeesFile == null}
            onClick={() => {
              window.open(registrationFeesFile, "_blank");
            }}
            type="button"
            style={{ margin: "10px" }}
          >
            Download Contract fees file
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiveRegstrationFees;
