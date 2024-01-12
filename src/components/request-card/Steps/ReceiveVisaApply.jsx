import NextStep from "../../NextStep";

const ReceiveVisaApply = ({ requestDetails, setRefresh, isDone }) => {
  const { applyingForVisa } = requestDetails;

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
        <span>Is Applied : {applyingForVisa ? "Yes" : "No"}</span>
      </div>
      <NextStep setRefresh={setRefresh} withNumber={false} />
    </div>
  );
};

export default ReceiveVisaApply;
