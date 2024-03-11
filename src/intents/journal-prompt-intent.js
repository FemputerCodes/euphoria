const axios = require("axios");

function journalPromptIntent(agent) {
  console.log("handling journal prompt intent");
  let promptType = agent.parameters.PromptType;
  let url = `https://api-portal-416020.uw.r.appspot.com/journal-prompts/random`;
  let conv = `This is the journal prompt intent!`;

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
      const properPromptType =
        promptType.charAt(0).toUpperCase() + promptType.slice(1);
      // conv = `I got you! ${properPromptType} journal prompt coming right up!`;
      conv = `This should work.`;
      conv += ` ${journalPrompt.text}`;
      agent.add(conv);

      // set context
      agent.context.set(`journal_prompt_context`, 20, {
        mainPromptType: promptType,
      });
    })
    .catch((error) => {
      console.error(error);
      conv = `I'm sorry! Something went wrong while trying to fetch the journal prompt.`;
      agent.add(conv);
    });
}

module.exports = journalPromptIntent;
