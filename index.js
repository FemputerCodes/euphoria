const express = require("express");
const app = express();
const PORT = 8080;
const { WebhookClient } = require("dialogflow-fulfillment");
const welcomeIntent = require("./functions/welcome-intent");
const affirmationIntent = require("./functions/affirmation-intent");

app.get("/", (req, res) => {
  res.send(`It's alive!`);
});

app.post("/", express.json(), (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  function welcome(agent) {
    welcomeIntent(agent);
  }

  function dailyAffirmation(agent) {
    affirmationIntent(agent);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  let intentMap = new Map();
  intentMap.set("Welcome Intent", welcome);
  intentMap.set("Affirmation Intent", dailyAffirmation);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});

app.listen(PORT, () =>
  console.log(`It's alive! Server is running on http://localhost:${PORT}`)
);
