import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../App";
import { toast } from "react-toastify";
import NextStep from "../../NextStep";

const SendMohereApproval = ({ setRefresh, isDone }) => {
  const [offerLetterFile, setOfferLetterFile] = useState(null);

  const { route, setLoader } = useContext(AppContext);
  const params = useParams();
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("MOHEREApproval", offerLetterFile);
    setLoader(true);
    fetch(
      `${route}/progress/uploadMOHEREApproval/${params.id}/${params.type}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Send Mohere approval step</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="offerLetterFile" style={{ paddingRight: "20px" }}>
          Mohere approval (pdf) :
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
      </form>
      <NextStep setRefresh={setRefresh} withNumber={true} />
    </div>
  );
};

export default SendMohereApproval;
