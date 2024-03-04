const axios = require("axios");

const general = [
  "general",
  "exciting",
  "fun",
  "generic",
  "any",
  "easy",
  "enjoyable",
  "entertaining",
  "amusing",
  "pleasant",
];

const reflection = [
  "reflection",
  "reflective",
  "introspective",
  "introspection",
  "thoughtfulness",
  "self-reflection",
  "self-introspection",
  "contemplative",
  "reflecting",
  "self-examination",
];

const gratitude = [
  "gratitude",
  "thankfulness",
  "appreciation",
  "thanks",
  "acknowledgement",
  "appreciating",
  "self-appreciation",
  "grateful",
  "gratefulness",
  "recognition",
];

const goals = [
  "goals",
  "goal-setting",
  "goal-oriented",
  "aims",
  "pursuits",
  "ambitions",
  "aspirations",
  "intentions",
  "obectives",
  "targets",
];

const convertPromptType = (promptType) => {
  console.log("original prompt type: ", promptType);
  if (general.includes(promptType) || promptType === "") promptType = "general";
  else if (reflection.includes(promptType)) promptType = "reflection";
  else if (gratitude.includes(promptType)) promptType = "gratitude";
  else if (goals.includes(promptType)) promptType = "goals";
  else promptType = "none";
  console.log("new prompt type: ", promptType);
  return promptType;
};

function journalPromptIntent(agent) {
  console.log("handling journal prompt intent");
  const promptType = agent.parameters.PromptType;
  let url = `https://api-portal-416020.uw.r.appspot.com/journal-prompts/random`;
  let conv = `This is the journal prompt intent!`;

  // check for prompt type
  let newPromptType = convertPromptType(promptType);
  if (newPromptType !== "none") {
    url += `/${newPromptType}`;
    console.log(url);

    return axios
      .get(url)
      .then((res) => {
        const journalPrompt = res.data.journalPrompt;
        console.log(journalPrompt.text);
        conv = `I got you! ${journalPrompt.text}`;
        agent.add(conv);
      })
      .catch((error) => {
        console.error(error);
        conv = `I'm sorry! Something went wrong.`;
        agent.add(conv);
      });
  } else {
    conv = `Sorry! I don't have a journal prompt like that.`;
    agent.add(conv);
  }
}

module.exports = journalPromptIntent;
