import NextStep from "../../NextStep";

const ReciveOfferLetterStep = ({ requestDetails, setRefresh, isDone }) => {
  const { signedOfferLetter } = requestDetails;

  const downloadFile = () => {
    window.open(signedOfferLetter, "_blank");
  };

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive Signed Offer letter step</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          disabled={signedOfferLetter == null}
          onClick={downloadFile}
          type="button"
          style={{ margin: "10px" }}
        >
          Download signed offer letter
        </button>
      </div>
      <NextStep setRefresh={setRefresh} withNumber={false} />
    </div>
  );
};

export default ReciveOfferLetterStep;
