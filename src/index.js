const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const { WebhookClient } = require("dialogflow-fulfillment");
const axios = require("axios");
const getRandom = require("./utils/get-random");

app.use(cors());

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
  `Just let me add my superhero cape and call me Wonder Rue!`,
  `I'm ready to save the day! What's the mission?`,
  `Anything you need, just let me know!`,
  `I've got your back. How can I support you?`,
];

const positivity = [
  "positivity",
  "positive",
  "empowering",
  "pick-me-up",
  "optimistic",
  "motivating",
  "inspirational",
  "inspiring",
  "uplifting",
  "elevating",
  "revitalizing",
];

const mindfulness = [
  "mindfulness",
  "awareness",
  "presence",
  "consciousness",
  "attention",
  "contemplation",
  "meditation",
  "focus",
  "thoughtfulness",
  "attentiveness",
  "mindful awareness",
];

const confidence = [
  "confidence-boosting",
  "confidence",
  "assurance",
  "self-assurance",
  "certainty",
  "self-confidence",
  "poise",
  "encouraging",
  "boldness",
  "conviction",
  "self-reliance",
];

const love = [
  "self-love",
  "self-acceptance",
  "self-appreciation",
  "self-respect",
  "self-compassion",
  "self-regard",
  "self-admiration",
  "self-esteem",
  "self-worth",
  "self-approval",
  "self-care",
];

app.get("/", (req, res) => {
  res.send(`It's alive! HI!`);
});

app.post("/", express.json(), (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  function handleWelcomeIntent(agent) {
    console.log("handling welcome intent");
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

  const convertAffirmationType = (affirmationType) => {
    console.log("original affirmation type: ", affirmationType);
    if (positivity.includes(affirmationType) || affirmationType === "")
      affirmationType = "positivity";
    else if (mindfulness.includes(affirmationType))
      affirmationType = "mindfulness";
    else if (confidence.includes(affirmationType))
      affirmationType = "confidence-boosting";
    else if (love.includes(affirmationType)) affirmationType = "self-love";
    else affirmationType = "none";
    console.log("new affirmation type: ", affirmationType);
    return affirmationType;
  };

  function handleAffirmationIntent(agent) {
    console.log("handling affirmation intent");
    const affirmationType = agent.parameters.AffirmationType;
    let url = `https://api-portal-416020.uw.r.appspot.com/affirmations/random`;
    let conv = `This is the affirmation intent!`;

    // check for affirmation type
    let newAffirmationType = convertAffirmationType(affirmationType);
    if (newAffirmationType !== "none") {
      url += `/${newAffirmationType}`;
      console.log(url);

      return axios
        .get(url)
        .then((res) => {
          const affirmation = res.data.affirmation;
          console.log(affirmation.text);
          conv = `I got you! Repeat after me: ${affirmation.text}`;
          agent.add(conv);
        })
        .catch((error) => {
          console.error(error);
          conv = `I'm sorry! Something happened.`;
          agent.add(conv);
        });
    } else {
      conv = `Sorry! I don't have an affirmation like that.`;
      agent.add(conv);
    }
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  let intentMap = new Map();
  intentMap.set("Welcome Intent", handleWelcomeIntent);
  intentMap.set("Affirmation Intent", handleAffirmationIntent);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});

app.listen(PORT, () =>
  console.log(`It's alive! Server is running on http://localhost:${PORT}`)
);
