import "./request.css";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../App";

import { useParams } from "react-router-dom";
import ContentTop from "../ContentTop/ContentTop";
import ContactStep from "./Steps/ContactStep";
import SendOfferLetterStep from "./Steps/SendOfferLetterStep";
import ReciveOfferLetterStep from "./Steps/ReciveOfferLetterStep";
import ReciveMohere from "./Steps/ReciveMohere";
import ReceiveConractFees from "./Steps/ReceiveConractFees";
import ReceiveVisaFees from "./Steps/ReceiveVisaFees";
import EMGSApproval from "./Steps/EMGSApproval";
import ReceiveRegstrationFees from "./Steps/ReceiveRegstrationFees";
import FinalAcceptance from "./Steps/FinalAcceptance";
import ReciveTicketStep from "./Steps/ReciveTicketStep";
import ReceiveVisaApply from "./Steps/ReceiveVisaApply";
import AirPickupReady from "./Steps/AirPickupReady";
import OrderTabel from "./OrderTabel";
import "../orders/order.css";
import { getRequestStateOrder } from "../../actions/getRequestStateOrder";
import SendMohereApproval from "./Steps/SendMohereApproval";
import SendEval from "./Steps/SendEval";
const RequestProgress = () => {
  const { route, setLoader } = useContext(AppContext);
  const [request, setRequest] = useState({});
  const [requestDetails, setRequestDetails] = useState({});
  const [refresh, setRefresh] = useState(0);
  const param = useParams();
  useEffect(() => {
    fetch(`${route}/${param.type}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let final = data.data.find((item) => item.id === param.id);
        setRequest(final);
      });
  }, [refresh, route, param.id, param.type]);
  useEffect(() => {
    if (request.requestDocId) {
      fetch(`${route}/crm/reqDoc/${request.requestDocId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setRequestDetails(data.data);
          }
        });
    }
  }, [request, route, refresh]);
  const order = getRequestStateOrder(request.currentStep);
  console.log(order);
  return (
    <div className="request-card">
      <ContentTop headTitle="Request Details" />
      <h1 style={{ margin: "20px", textAlign: "center" }}>
        Current State: {request.currentStep}
      </h1>
      <div className="container">
        <ContactStep
          isDone={order > 0}
          requestDetails={requestDetails}
          setRefresh={setRefresh}
        />
        <ReceiveConractFees
          isDone={order > 1}
          requestDetails={requestDetails}
          setRefresh={setRefresh}
        />
        <SendOfferLetterStep
          isDone={order > 2}
          requestDetails={requestDetails}
          setRefresh={setRefresh}
        />
        <ReciveOfferLetterStep
          isDone={order > 3}
          requestDetails={requestDetails}
          setRefresh={setRefresh}
        />
        <ReciveMohere
          isDone={order > 4}
          requestDetails={requestDetails}
          setRefresh={setRefresh}
        />
        <SendMohereApproval isDone={order > 5} setRefresh={setRefresh} />
        <SendEval isDone={order > 6} setRefresh={setRefresh} />

        <ReceiveVisaFees
          requestDetails={requestDetails}
          isDone={order > 7}
          setRefresh={setRefresh}
        />
        <EMGSApproval setRefresh={setRefresh} isDone={order > 8} />
        <ReceiveRegstrationFees
          isDone={order > 9}
          requestDetails={requestDetails}
          setRefresh={setRefresh}
        />
        <FinalAcceptance isDone={order > 10} setRefresh={setRefresh} />
        <ReciveTicketStep
          setRefresh={setRefresh}
          isDone={order > 11}
          requestDetails={requestDetails}
        />
        <ReceiveVisaApply
          setRefresh={setRefresh}
          isDone={order > 12}
          requestDetails={requestDetails}
        />
        <AirPickupReady
          isDone={order > 13}
          setRefresh={setRefresh}
          requestDetails={requestDetails}
        />

        <OrderTabel />
      </div>
    </div>
  );
};

export default RequestProgress;
