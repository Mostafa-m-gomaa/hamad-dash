import "./request.css";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../App";

import { useParams } from "react-router-dom";
import ContentTop from "../ContentTop/ContentTop";
const RequestCard = () => {
  const { route, setLoader } = useContext(AppContext);
  const [request, setRequest] = useState({});
  const [requestDoc, setRequestDoc] = useState({});
  const param = useParams();

  useEffect(() => {
    setLoader(true);
    fetch(`${route}/${param.type}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let final = data.data.find((item) => item.id === param.id);
        setRequest(final);
        console.log(data);
      })
      .finally(() => setLoader(false));
  }, [route, param.id, param.type, setLoader]);
  useEffect(() => {
    if (request.requestDocId) {
      fetch(`${route}/crm/reqDoc/${request.requestDocId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setRequestDoc(data.data);
        });
    }
  }, [request.requestDocId, route]);
  const bacLinks = [
    {
      name: "cv",
      link: request.CV,
    },
    {
      name: "High School Certificate",
      link: request.HighSchoolCertificate,
    },
    {
      name: "Passport",
      link: request.Passport,
    },
    {
      name: "Personal Picture",
      link: request.PersonalPicture,
    },
    {
      name: "Personal Statement",
      link: request.PersonalStatement,
    },
  ];
  const masterLinks = [
    ...bacLinks,
    {
      name: "Bachelors Degree Certificate With Transcript",
      link: request.BachelorsDegreeCertificateWithTranscript,
    },
    {
      name: "Experience Letter",
      link: request.ExperienceLetter,
    },
    {
      name: "English Test Results",
      link: request.EnglishTestResults,
    },
    {
      name: "Two Recommendation Letters",
      link: request.TwoRecommendationLetters,
    },
    {
      name: "Research Proposal",
      link: request.ResearchProposal,
    },
  ];
  const phdLinks = [
    ...masterLinks,
    {
      name: "Masters Degree Certificate With Transcript",
      link: request.MastersDegreeCertificateWithTranscript,
    },
  ];
  const docLinks = [
    {
      name: "Contract",
      link: requestDoc?.contract,
    },
    {
      name: "EMGS",
      link: requestDoc?.EMGS,
    },
    {
      name: "EVAL",
      link: requestDoc?.EVAL,
    },
    {
      name: "contractFeesFile",
      link: requestDoc?.contractFeesFile,
    },
    {
      name: "registrationFeesFile",
      link: requestDoc?.registrationFeesFile,
    },
    {
      name: "visaFeesFile",
      link: requestDoc?.visaFeesFile,
    },
    {
      name: "Signed Contract",
      link: requestDoc?.signedContract,
    },
    {
      name: "Offer Letter",
      link: requestDoc?.offerLetter,
    },
    {
      name: "Signed Offer Letter",
      link: requestDoc?.signedOfferLetter,
    },

    {
      name: "Final Acceptance Letter",
      link: requestDoc?.finalAcceptanceLetter,
    },

    {
      name: "Mohere",
      link: requestDoc?.MOHERE,
    },
    {
      name: "Mohere Approval",
      link: requestDoc?.MOHEREApproval,
    },
    {
      name: "Ticket",
      link: requestDoc?.ticket,
    },
  ];
  console.log(request);
  return (
    <div className="request-card">
      <ContentTop headTitle="Request Details" />

      <div className="container">
        <div className="details">
          <h2>Request Details</h2>
          <div className="req-details">
            <div>Country Of Study : {request.CountryOfStudy}</div>
            <div>
              Required Specialization : {request.RequiredSpecialization}
            </div>
            <div>Additional Service : {request.additionalService}</div>
            {param.type === "Bachelor" && (
              <>
                {bacLinks.map((item, index) => (
                  <>
                    {item.link && (
                      <a
                        key={index}
                        href={`${item.link}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.name}
                      </a>
                    )}
                  </>
                ))}
              </>
            )}
            {param.type === "Master" && (
              <>
                {masterLinks.map((item, index) => (
                  <>
                    {item.link && (
                      <a
                        key={index}
                        href={`${item.link}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.name}
                      </a>
                    )}
                  </>
                ))}
              </>
            )}
            {param.type === "PHD" && (
              <>
                {phdLinks.map((item, index) => (
                  <>
                    {item.link && (
                      <a
                        key={index}
                        href={`${item.link}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.name}
                      </a>
                    )}
                  </>
                ))}
              </>
            )}
          </div>

          <h2>user details</h2>
          <div className="user-details">
            <div className="name">
              User Name : {request.UserDetails?.username}
            </div>
            <div className="name">
              User Email : {request.UserDetails?.email}
            </div>
            <div className="name">
              Request Type : {request.UserDetails?.type}
            </div>
          </div>
          <h2>Employee details</h2>
          <div className="user-details">
            <div>Employee Name : {request.Employee?.username}</div>
            <div>Employee Email : {request.Employee?.email}</div>
          </div>
          {requestDoc && (
            <>
              <h2>Progress Files</h2>
              <div className="user-details">
                {docLinks.map((item, index) => (
                  <>
                    {item.link && (
                      <a
                        key={index}
                        href={`${item.link}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.name}
                      </a>
                    )}
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
