const { default: axios } = require("axios");
const { getRandom } = require("../utils/utils");

const negativeResponses = [
  `You do realize you're asking for bad advice, right? Just checking.`,
  `Bad advice coming right up! Just kidding, I don't want to be responsible for your chaos.`,
  `Let's turn that mood around. You've got this!"`,
  `Oh, we're not in the business of spreading self-doubt here. How about a nice walk outside instead? Much more Rue-approved.`,
  `Sorry, I left my 'spread negativity' manual at home today. But hey, how about taking a nice walk outside?"`,
  `Well, that's a unique request. How about we go for having a snack to lift your spirits instead? You're stronger than any temporary low.`,
];

function takeBreakIntent(agent) {
  console.log("handling take break intent");
  const negativeType = agent.parameters.NegativeType;
  let breakLocation = agent.parameters.BreakLocation;
  let breakType = agent.parameters.BreakType;
  let breakLength = agent.parameters.BreakLength;
  let url = `https://api-portal-416020.uw.r.appspot.com/step-backs/random`;
  let conv = `This is the take break intent!`;

  console.log("break location: ", breakLocation);
  console.log("break type: ", breakType);
  console.log("break length: ", breakLength);

  // check if there's a negative type
  if (!negativeType) {
    if (breakLocation) {
      url += `/${breakLocation}`;
    }
    if (breakType) {
      url += `/${breakType}`;
    }
    if (breakLength) {
      url += `/${breakLength}`;
    }

    console.log("url: ", url);

    return axios
      .get(url)
      .then((res) => {
        const takeBreak = res.data.stepBack;
        console.log("break: ", takeBreak.text);
        conv = `${takeBreak.text}`;
        agent.add(conv);
      })
      .catch((error) => {
        console.error(error);
        conv = `I'm sorry! Something went wrong.`;
        agent.add(conv);
      });
  } else {
    const randomNegative = getRandom(negativeResponses.length);
    conv = negativeResponses[randomNegative];
    agent.add(conv);
  }
}

module.exports = takeBreakIntent;
