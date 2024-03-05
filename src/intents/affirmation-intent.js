const axios = require("axios");

function affirmationIntent(agent) {
  console.log("handling affirmation intent");
  let affirmationType = agent.parameters.AffirmationType;
  let url = `https://api-portal-416020.uw.r.appspot.com/affirmations/random`;
  let conv = `This is the affirmation intent!`;

  console.log("affirmation type:", affirmationType);

  if (affirmationType === "") {
    affirmationType = "positivity";
  }
  url += `/${affirmationType}`;
  console.log("url: ", url);

  return axios
    .get(url)
    .then((res) => {
      const affirmation = res.data.affirmation;
      console.log("affirmation: ", affirmation.text);
      conv = `I got you! Repeat after me: ${affirmation.text}`;
      agent.add(conv);
    })
    .catch((error) => {
      console.error(error);
      conv = `I'm sorry! Something happened.`;
      agent.add(conv);
    });
}

module.exports = affirmationIntent;
