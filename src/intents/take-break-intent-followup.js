const { default: axios } = require("axios");

function takeBreakIntentFollowup(agent) {
  console.log("handling take break intent followup");
  const breakContext = agent.context.get(`take_break_context`);
  let breakLocation = agent.parameters.BreakLocation;
  let breakType = agent.parameters.BreakType;
  let breakLength = agent.parameters.BreakLength;
  let url = `https://api-portal-416020.uw.r.appspot.com/step-backs/random`;
  let conv = `This is the take break intent followup!`;

  if (breakContext) {
    console.log(breakContext);
    conv = `Sure! Here's a suggestion for your break:`;
    const contextParams = breakContext.parameters;
    if (contextParams.BreakLocation) {
      breakLocation = contextParams.BreakLocation;
    }
    if (contextParams.BreakType) {
      breakType = contextParams.BreakType;
    }
    if (contextParams.BreakLength) {
      breakLength = contextParams.BreakLength;
    }
  }
  console.log("break location: ", breakLocation);
  console.log("break type: ", breakType);
  console.log("break length: ", breakLength);

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
      conv = `I'm sorry! Something happened while fetching a step back suggestion.`;
      agent.add(conv);
    });
}

module.exports = takeBreakIntentFollowup;
