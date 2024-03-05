const { getRandom } = require("../utils/utils");

const negativeResponses = [
  `You do realize you're asking for bad advice, right? Just checking.`,
  `Bad advice coming right up! Just kidding, I don't want to be responsible for your chaos.`,
  `Want bad advice? Try wearing mismatched socks to a job interview. Confidence booster, guaranteed.`,
  `Let's turn that mood around. You've got this!"`,
  `Oh, we're not in the business of spreading self-doubt here. How about a confidence-boosting quote instead? Much more Rue-approved.`,
  `Sorry, I left my 'spread negativity' manual at home today. But hey, how about an affirmation or a journal prompt to lighten the mood?"`,
  `Well, that's a unique request. How about we go for an affirmation to lift your spirits instead? You're stronger than any temporary low.`,
];

function negativityIntent(agent) {
  console.log("handling catch negativity intent");
  const negativeType = agent.parameters.NegativeType;
  let conv = `This is the affirmation intent`;

  const randomNegative = getRandom(negativeResponses.length);
  conv = negativeResponses[randomNegative];
  agent.add(conv);
}

module.exports = negativityIntent;
