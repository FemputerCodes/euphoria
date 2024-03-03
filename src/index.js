const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const { WebhookClient } = require("dialogflow-fulfillment");
const welcome = require("./intents/welcome-intent");
const affirmation = require("./intents/affirmation-intent");
const fallback = require("./intents/fallback-intent");

app.use(cors());

app.get("/", (req, res) => {
  res.send(`It's alive!`);
});

app.post("/", express.json(), (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  let intentMap = new Map();
  intentMap.set("Welcome Intent", welcome);
  intentMap.set("Affirmation Intent", affirmation);
  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});

app.listen(PORT, () =>
  console.log(`It's alive! Server is running on http://localhost:${PORT}`)
);
