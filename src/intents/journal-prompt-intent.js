const axios = require("axios");
const { getRandom, negativeResponses } = require("../utils/utils");

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

const negativeResponses = [
  `You do realize you're asking for bad advice, right? Just checking.`,
  `Bad advice coming right up! Just kidding, I don't want to be responsible for your chaos.`,
  `Want bad advice? Try wearing mismatched socks to a job interview. Confidence booster, guaranteed.`,
  `Let's turn that mood around. You've got this!"`,
  `Oh, we're not in the business of spreading self-doubt here. How about a gratitude prompt instead? Much more Rue-approved.`,
  `Sorry, I left my 'spread negativity' manual at home today. But hey, how about a fun journal prompt to lighten the mood?"`,
  `Well, that's a unique request. How about we go for a pleasant journal prompt to lift your spirits instead? You're stronger than any temporary low.`,
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
  const negativeType = agent.parameters.NegativeType;
  let url = `https://api-portal-416020.uw.r.appspot.com/journal-prompts/random`;
  let conv = `This is the journal prompt intent!`;

  if (!negativeType) {
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
  } else {
    const randomNegative = getRandom(negativeResponses.length);
    conv = negativeResponses[randomNegative];
    agent.add(conv);
  }
}

module.exports = journalPromptIntent;
