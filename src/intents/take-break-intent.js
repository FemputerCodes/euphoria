const { getRandom } = require("../utils/utils");

function takeBreakIntent(agent) {
  console.log("handling take break intent");
  const breakLocation = agent.parameters.BreakLocation;
  const breakType = agent.parameters.BreakType;
  const breakLength = agent.parameters.BreakLength;
  const negativeType = agent.parameters.NegativeType;
  let url = `https://api-portal-416020.uw.r.appspot.com/step-back/random`;
  let conv = `This is the take break intent!`;
  console.log(url);
  agent.add(conv);
}

module.exports = takeBreakIntent;
