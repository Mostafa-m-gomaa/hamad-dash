import NextStep from "../../NextStep";

const ReceiveRegstrationFees = ({ setRefresh, isDone, requestDetails }) => {
  const { registrationFeesFile } = requestDetails;

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive Registration Fees</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <NextStep setRefresh={setRefresh} withNumber={false} />

        <button
          disabled={registrationFeesFile == null}
          onClick={() => {
            window.open(registrationFeesFile, "_blank");
          }}
          type="button"
          style={{ margin: "10px" }}
        >
          Download registration fees file
        </button>
      </div>
    </div>
  );
};

export default ReceiveRegstrationFees;
