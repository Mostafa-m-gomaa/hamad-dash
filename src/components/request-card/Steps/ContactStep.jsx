import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import { toast } from "react-toastify";
import NextStep from "../../NextStep";

const ContactStep = ({ requestDetails, setRefresh, isDone }) => {
  const [contactFile, setContactFile] = useState(null);
  const { route, setLoader } = useContext(AppContext);

  const { signedContract } = requestDetails;
  const params = useParams();
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("contract", contactFile);
    setLoader(true);
    fetch(`${route}/progress/uploadContract/${params.id}/${params.type}`, {
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
  const downloadFile = () => {
    window.open(signedContract, "_blank");
  };

  return (
    <>
      <div className={`details ${isDone ? "done" : ""}`}>
        <h2>Contract Step</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="contactFile" style={{ paddingRight: "20px" }}>
            Contact File (pdf) :
          </label>
          <input
            type="file"
            id="contactFile"
            accept="application/pdf"
            required
            onChange={(e) => setContactFile(e.target.files[0])}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button style={{ margin: "10px" }}>Upload</button>
            <button
              disabled={signedContract == null}
              onClick={downloadFile}
              type="button"
              style={{ margin: "10px" }}
            >
              Download Signed Contract file
            </button>
          </div>
        </form>
        <NextStep setRefresh={setRefresh} withNumber={true} />
      </div>
    </>
  );
};

export default ContactStep;
