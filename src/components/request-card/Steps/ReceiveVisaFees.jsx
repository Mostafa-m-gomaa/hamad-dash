import NextStep from "../../NextStep";

const ReceiveVisaFees = ({ setRefresh, isDone, requestDetails }) => {
  const { visaFeesFile } = requestDetails;

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive Visa Fees</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <NextStep setRefresh={setRefresh} withNumber={false} />

        <button
          disabled={visaFeesFile == null}
          onClick={() => {
            window.open(visaFeesFile, "_blank");
          }}
          type="button"
          style={{ margin: "10px" }}
        >
          Download Visa fees file
        </button>
      </div>
    </div>
  );
};

export default ReceiveVisaFees;
