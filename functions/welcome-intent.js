const getRandom = require("./get-random");

const welcomes = [
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

const assists = [
  `What do you need?`,
  `Tell me what I can do!`,
  `How can I assist you?`,
  `Is there something on your mind?`,
  `I'm here for you. What can I do to make things easier?`,
  `You know I've got your back. What can I do?`,
  `Oh, just add my superhero cape and call me Wonder Rue!`,
  `Ready to save the day. What's the mission?`,
  `Anything you need, just let me know!`,
  `I've got your back. How can I support you?`,
];

function welcomeIntent(agent) {
  const voiceAssistant = agent.parameters.VoiceAssistant;
  let conv = `This is the welcome intent!`;
  const randomWelcome = getRandom(welcomes.length);
  const randomAssist = getRandom(assists.length);
  conv = welcomes[randomWelcome];

  if (!voiceAssistant) {
    conv += ` My name is Rue!`;
  }

  conv += ` Welcome to the Euphoria app, where I provide daily affirmations, journal prompts, and suggestions to help you take a break and relax. `;
  conv += ` `;
  conv += assists[randomAssist];

  agent.add(conv);
}

module.exports = welcomeIntent;
