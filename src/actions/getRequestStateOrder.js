export const getRequestStateOrder = (step) => {
  const steps = [
    "sign_contract",
    "contract_fees",
    "sending_offerLetter",
    "deliver_and_sign_offerLetter",
    "get_copy_of_mohere",
    "mohere_approval",
    "visa_fees",
    "getting_EMGS_approval",
    "EVAL",
    "registration_fees",
    "getting_final_acceptance_letter",
    "recieving_ticket_copy",
    "applying_for_visa",
    "arranging_airport_pickup",
    "Done",
  ];
  const index = steps.indexOf(step);
  return index;
};
