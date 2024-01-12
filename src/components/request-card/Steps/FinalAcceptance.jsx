import { useParams } from "react-router-dom";
import NextStep from "../../NextStep";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { toast } from "react-toastify";

const FinalAcceptance = ({ setRefresh, isDone }) => {
  const params = useParams();
  const { route, setLoader } = useContext(AppContext);
  const [offerLetterFile, setOfferLetterFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("finalAcceptanceLetter", offerLetterFile);
    setLoader(true);
    fetch(
      `${route}/progress/uploadfinalAcceptanceLetter/${params.id}/${params.type}`,
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
      <h2>Receive final acceptance letter</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="offerLetterFile" style={{ paddingRight: "20px" }}>
          final acceptance letter (pdf) :
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
      <NextStep setRefresh={setRefresh} withNumber={false} />
    </div>
  );
};

export default FinalAcceptance;
