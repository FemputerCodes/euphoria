const { getRandom } = require("../utils/utils");

const welcomeResponses = [
  `Hey!`,
  `What's up!`,
  `Hi there!`,
  `Hey, how's it going, friend?`,
  `What's good?`,
  `Hello!`,
  `Hi!`,
  `Well, look who it is!`,
  `Yay! You're here!`,
];

const assistResponses = [
  `What do you need?`,
  `Tell me what I can do!`,
  `How can I assist you?`,
  `Is there something on your mind?`,
  `I'm here for you. What can I do to make things easier?`,
  `You know I've got your back. What can I do?`,
  `Just let me put on my superhero cape and call me Wonder Rue!`,
  `I'm ready to save the day! What's the mission?`,
  `Anything you need, just let me know!`,
  `I've got your back. How can I support you?`,
];

function welcomeIntent(agent) {
  console.log("handling welcome intent");
  const voiceAssistant = agent.parameters.VoiceAssistant;
  let conv = `This is the welcome intent!`;
  const randomWelcome = getRandom(welcomeResponses.length);
  const randomAssist = getRandom(assistResponses.length);
  conv = welcomeResponses[randomWelcome];

  if (!voiceAssistant) {
    conv += ` My name is Rue!`;
  }

  conv += ` Welcome to the Euphoria app, where I provide daily affirmations, journal prompts, and suggestions to help you take a break and relax.`;
  conv += ` `;
  conv += assistResponses[randomAssist];

  agent.add(conv);
}

module.exports = welcomeIntent;
