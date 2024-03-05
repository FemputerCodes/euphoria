const axios = require("axios");

function journalPromptIntent(agent) {
  console.log("handling journal prompt intent");
  let promptType = agent.parameters.PromptType;
  let url = `https://api-portal-416020.uw.r.appspot.com/journal-prompts/random`;
  let conv = `This is the journal prompt intent!`;

  console.log("prompt type: ", promptType);

  if (promptType === "") {
    promptType = "general";
  }
  url += `/${promptType}`;
  console.log("url: ", url);

  return axios
    .get(url)
    .then((res) => {
      const journalPrompt = res.data.journalPrompt;
      console.log("journal prompt: ", journalPrompt.text);
      conv = `I got you! ${journalPrompt.text}`;
      agent.add(conv);
    })
    .catch((error) => {
      console.error(error);
      conv = `I'm sorry! Something went wrong while trying to fetch the journal prompt.`;
      agent.add(conv);
    });
}

module.exports = journalPromptIntent;
