import { useContext } from "react";
import { useParams } from "react-router-dom";
import NextStep from "../../NextStep";

const ReciveTicketStep = ({ requestDetails, setRefresh, isDone }) => {
  const { ticket } = requestDetails;

  const downloadFile = () => {
    window.open(ticket, "_blank");
  };

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive Ticket step</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          disabled={ticket == null}
          onClick={downloadFile}
          type="button"
          style={{ margin: "10px" }}
        >
          Download ticket
        </button>
      </div>
      <NextStep setRefresh={setRefresh} withNumber={false} />
    </div>
  );
};

export default ReciveTicketStep;
