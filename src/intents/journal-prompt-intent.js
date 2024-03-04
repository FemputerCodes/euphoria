const axios = require("axios");
const { getRandom, convertPromptType } = require("../utils/utils");

const negativeResponses = [
  `You do realize you're asking for bad advice, right? Just checking.`,
  `Bad advice coming right up! Just kidding, I don't want to be responsible for your chaos.`,
  `Want bad advice? Try wearing mismatched socks to a job interview. Confidence booster, guaranteed.`,
  `Let's turn that mood around. You've got this!"`,
  `Oh, we're not in the business of spreading self-doubt here. How about a gratitude prompt instead? Much more Rue-approved.`,
  `Sorry, I left my 'spread negativity' manual at home today. But hey, how about a fun journal prompt to lighten the mood?"`,
  `Well, that's a unique request. How about we go for a pleasant journal prompt to lift your spirits instead? You're stronger than any temporary low.`,
];

function journalPromptIntent(agent) {
  console.log("handling journal prompt intent");
  const negativeType = agent.parameters.NegativeType;
  let promptType = agent.parameters.PromptType;
  let url = `https://api-portal-416020.uw.r.appspot.com/journal-prompts/random`;
  let conv = `This is the journal prompt intent!`;

  console.log("prompt type: ", promptType);

  // check if there's a negative type
  if (!negativeType) {
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
        conv = `I'm sorry! Something went wrong.`;
        agent.add(conv);
      });
  } else {
    const randomNegative = getRandom(negativeResponses.length);
    conv = negativeResponses[randomNegative];
    agent.add(conv);
  }
}

module.exports = journalPromptIntent;
