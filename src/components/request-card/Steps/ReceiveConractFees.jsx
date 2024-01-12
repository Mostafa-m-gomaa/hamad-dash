import NextStep from "../../NextStep";

const ReceiveConractFees = ({ setRefresh, isDone, requestDetails }) => {
  const { contractFeesFile } = requestDetails;

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive Contract fees</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <NextStep setRefresh={setRefresh} withNumber={false} />

        <button
          disabled={contractFeesFile == null}
          onClick={() => {
            window.open(contractFeesFile, "_blank");
          }}
          type="button"
          style={{ margin: "10px" }}
        >
          Download Contract fees file
        </button>
      </div>
    </div>
  );
};

export default ReceiveConractFees;
