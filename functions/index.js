const express = require("express");
const app = express();
const PORT = 8080;
const { WebhookClient } = require("dialogflow-fulfillment");
const welcomeIntent = require("./welcome-intent");

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

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function dailyAffirmation(agent) {
    agent.add(`This is the daily affirmation intent!`);
  }

  let intentMap = new Map();
  intentMap.set("Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("Daily Affirmation Intent", dailyAffirmation);
  agent.handleRequest(intentMap);
});

app.listen(PORT, () =>
  console.log(`It's alive! Server is running on http://localhost:${PORT}`)
);
