import NextStep from "../../NextStep";

const ReceiveVisaApply = ({ requestDetails, setRefresh, isDone }) => {
  const { applyingForSEV } = requestDetails;

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive Visa Apply</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span>Is Applied : {applyingForSEV ? "Yes" : "No"}</span>
      </div>
      <NextStep setRefresh={setRefresh} withNumber={false} />
    </div>
  );
};

export default ReceiveVisaApply;
