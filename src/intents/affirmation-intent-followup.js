const axios = require("axios");

function affirmationIntentFollowup(agent) {
  console.log("handling affirmation intent followup");
  const affirmationContext = agent.context.get(`affirmation_context`);
  let affirmationType = agent.parameters.AffirmationType;
  let url = `https://api-portal-416020.uw.r.appspot.com/affirmations/random`;
  let conv = `This is the affirmation intent followup!`;

  if (affirmationContext) {
    console.log(affirmationContext);
    if (!affirmationType) {
      affirmationType = affirmationContext.parameters.mainAffirmationType;
      conv = `Sure! Another ${affirmationType} affirmation coming right up!`;
    } else {
      const properAffirmationType =
        affirmationType.charAt(0).toUpperCase() + affirmationType.slice(1);
      conv = `Absolutely! ${properAffirmationType} affirmation coming right up!`;
    }
  }

  if (affirmationType === "" || affirmationType === undefined) {
    affirmationType = "positivity";
  }

  console.log(affirmationType);

  url += `/${affirmationType}`;
  console.log("url: ", url);

  return axios
    .get(url)
    .then((res) => {
      const affirmation = res.data.affirmation;
      console.log("affirmation: ", affirmation.text);
      console.log("affirmation type: ", affirmation.type);
      conv += ` Repeat after me: ${affirmation.text}`;
      agent.add(conv);
    })
    .catch((error) => {
      console.error(error);
      conv = `I'm sorry! Something happend while fetching the affirmation.`;
      agent.add(conv);
    });
}

module.exports = affirmationIntentFollowup;
