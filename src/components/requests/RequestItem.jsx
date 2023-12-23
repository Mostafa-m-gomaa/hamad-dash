import { Link } from "react-router-dom";

const RequestItem = ({
  item,
  index,
  clickAssign,
  acceptRequest,
  type,
  isEmployerView,
}) => {
  return (
    <div className="request">
      <h2>request {index + 1}</h2>
      <div>state : {item.Eligibility}</div>
      <div>current Step : {item.currentStep}</div>
      {item.employeeId ? (
        <div> request assigned </div>
      ) : (
        <div> request not assigned </div>
      )}
      {!isEmployerView && (
        <>
          {item.Eligibility === "eligible" ? null : (
            <button onClick={() => acceptRequest(type, item.id)}>Accept</button>
          )}
          <Link to={`/request/${type}/${item.id}`}>view request </Link>
          {item.Eligibility === "pending" ? null : (
            <button onClick={() => clickAssign(item.id, item.UserId)}>
              Assign to emp
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RequestItem;
