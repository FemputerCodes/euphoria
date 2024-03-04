const axios = require("axios");
const { getRandom } = require("../utils/utils");

const positivity = [
  "positivity",
  "positive",
  "empowering",
  "pick-me-up",
  "optimistic",
  "motivating",
  "inspirational",
  "inspiring",
  "uplifting",
  "elevating",
  "revitalizing",
];
const mindfulness = [
  "mindfulness",
  "awareness",
  "presence",
  "consciousness",
  "attention",
  "contemplation",
  "meditation",
  "focus",
  "thoughtfulness",
  "attentiveness",
  "mindful awareness",
];
const confidence = [
  "confidence-boosting",
  "confidence",
  "assurance",
  "self-assurance",
  "certainty",
  "self-confidence",
  "poise",
  "encouraging",
  "boldness",
  "conviction",
  "self-reliance",
];
const love = [
  "self-love",
  "self-acceptance",
  "self-appreciation",
  "self-respect",
  "self-compassion",
  "self-regard",
  "self-admiration",
  "self-esteem",
  "self-worth",
  "self-approval",
  "self-care",
];

const negativeResponses = [
  `You do realize you're asking for bad advice, right? Just checking.`,
];

const convertAffirmationType = (affirmationType) => {
  console.log("original affirmation type: ", affirmationType);
  if (positivity.includes(affirmationType) || affirmationType === "")
    affirmationType = "positivity";
  else if (mindfulness.includes(affirmationType))
    affirmationType = "mindfulness";
  else if (confidence.includes(affirmationType))
    affirmationType = "confidence-boosting";
  else if (love.includes(affirmationType)) affirmationType = "self-love";
  else affirmationType = "none";
  console.log("new affirmation type: ", affirmationType);
  return affirmationType;
};

function affirmationIntent(agent) {
  console.log("handling affirmation intent");
  const affirmationType = agent.parameters.AffirmationType;
  const negativeType = agent.parameters.NegativeType;
  let url = `https://api-portal-416020.uw.r.appspot.com/affirmations/random`;
  let conv = `This is the affirmation intent!`;

  // check if there's a negative type
  if (!negativeType) {
    // check for affirmation type
    let newAffirmationType = convertAffirmationType(affirmationType);
    if (newAffirmationType !== "none") {
      url += `/${newAffirmationType}`;
      console.log(url);

      return axios
        .get(url)
        .then((res) => {
          const affirmation = res.data.affirmation;
          console.log(affirmation.text);
          conv = `I got you! Repeat after me: ${affirmation.text}`;
          agent.add(conv);
        })
        .catch((error) => {
          console.error(error);
          conv = `I'm sorry! Something happened.`;
          agent.add(conv);
        });
    } else {
      conv = `Sorry! I don't have an affirmation like that.`;
      agent.add(conv);
    }
  } else {
    const randomNegative = getRandom(negativeResponses.length);
    conv = negativeResponses[randomNegative];
    agent.add(conv);
  }
}

module.exports = affirmationIntent;
