const axios = require("axios");
const { getRandom, convertAffirmationType } = require("../utils/utils");

const negativeResponses = [
  `You do realize you're asking for bad advice, right? Just checking.`,
  `Bad advice coming right up! Just kidding, I don't want to be responsible for your chaos.`,
  `Want bad advice? Try wearing mismatched socks to a job interview. Confidence booster, guaranteed.`,
  `Let's turn that mood around. You've got this!"`,
  `Oh, we're not in the business of spreading self-doubt here. How about a confidence-boosting quote instead? Much more Rue-approved.`,
  `Sorry, I left my 'spread negativity' manual at home today. But hey, how about an affirmation or a journal prompt to lighten the mood?"`,
  `Well, that's a unique request. How about we go for an affirmation to lift your spirits instead? You're stronger than any temporary low.`,
];

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
