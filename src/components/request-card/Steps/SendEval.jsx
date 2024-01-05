import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import { toast } from "react-toastify";

const SendEval = ({ setRefresh, isDone }) => {
  const [offerLetterFile, setOfferLetterFile] = useState(null);
  const { route, setLoader } = useContext(AppContext);
  const [totalOrderPrice, setTotalOrderPrice] = useState("");
  const params = useParams();
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("EVAL", offerLetterFile);
    setLoader(true);
    fetch(`${route}/progress/uploadEVAL/${params.id}/${params.type}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoader(false));
  };

  const onNextStep = (e) => {
    e.preventDefault();
    setLoader(true);
    fetch(`${route}/progress/nextStep/${params.id}/${params.type}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalOrderPrice: +totalOrderPrice,
      }),
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
      <h2>Send Eval step</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="offerLetterFile" style={{ paddingRight: "20px" }}>
          Eval (pdf) :
        </label>
        <input
          type="file"
          id="offerLetterFile"
          accept="application/pdf"
          required
          onChange={(e) => setOfferLetterFile(e.target.files[0])}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button style={{ margin: "10px" }}>Upload</button>
        </div>
      </form>{" "}
      <form onSubmit={onNextStep}>
        <label htmlFor="totalOrderPrice" style={{ paddingRight: "20px" }}>
          Total Order Price (of next step) :
        </label>
        <input
          type="number"
          id="totalOrderPrice"
          required
          onChange={(e) => setTotalOrderPrice(e.target.value)}
        />
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
      </form>
    </div>
  );
};

export default SendEval;
