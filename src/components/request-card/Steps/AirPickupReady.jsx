import NextStep from "../../NextStep";

const AirPickupReady = ({ setRefresh, isDone }) => {
  return (
    <div className={`details ${isDone ? "done" : ""}`}>
      <h2>Air pick up ready</h2>
      <NextStep setRefresh={setRefresh} withNumber={false} />
    </div>
  );
};

export default AirPickupReady;
