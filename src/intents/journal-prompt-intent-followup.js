const axios = require("axios");

function journalPromptIntentFollowup(agent) {
  console.log("handling journal prompt intent followup");
  const journalPromptContext = agent.context.get(`journal_prompt_context`);
  let promptType = agent.parameters.PromptType;
  let url = `https://api-portal-416020.uw.r.appspot.com/journal-prompts/random`;
  let conv = `This is the journal prompt intent followup!`;

  if (journalPromptContext) {
    console.log(journalPromptContext);
    if (!promptType) {
      promptType = journalPromptContext.parameters.mainPromptType;
      // conv = `Sure! Another ${promptType} journal prompt coming right up!`;
      conv = `Sure! Here's another`;
    } else {
      const properPromptType =
        promptType.charAt(0).toUpperCase() + promptType.slice(1);
      conv = `Absolutely! ${properPromptType} journal prompt coming right up!`;
    }
  }

  if (promptType === "") {
    promptType = "general";
  }

  console.log("prompt type: ", promptType);

  url += `/${promptType}`;
  console.log("url: ", url);

  return axios
    .get(url)
    .then((res) => {
      const journalPrompt = res.data.journalPrompt;
      console.log("journal prompt: ", journalPrompt.text);
      console.log("journal prompt type: ", journalPrompt.type);
      conv += ` ${journalPrompt.text}`;
      agent.add(conv);
    })
    .catch((error) => {
      console.error(error);
      conv = `I'm sorry! Something went wrong while trying to fetch the journal prompt.`;
      agent.add(conv);
    });
}

module.exports = journalPromptIntentFollowup;
