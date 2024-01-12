import NextStep from "../../NextStep";

const ReciveMohere = ({ requestDetails, setRefresh, isDone }) => {
  const { MOHERE } = requestDetails;

  const downloadFile = () => {
    window.open(MOHERE, "_blank");
  };

  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Receive mohere</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          disabled={MOHERE == null}
          onClick={downloadFile}
          type="button"
          style={{ margin: "10px" }}
        >
          Download mohere
        </button>
      </div>
      <NextStep setRefresh={setRefresh} withNumber={false} />
    </div>
  );
};

export default ReciveMohere;
