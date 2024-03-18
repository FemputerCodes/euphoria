const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const { WebhookClient } = require("dialogflow-fulfillment");
const welcome = require("./intents/welcome-intent");
const affirmation = require("./intents/affirmation-intent");
const affirmationFollowup = require("./intents/affirmation-intent-followup");
const journalPrompt = require("./intents/journal-prompt-intent");
const journalPromptFollowup = require("./intents/journal-prompt-intent-followup");
const takeBreak = require("./intents/take-break-intent");
const takeBreakFollowup = require("./intents/take-break-intent-followup");

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
  intentMap.set("Affirmation Intent - Another", affirmationFollowup);
  intentMap.set("Journal Prompt Intent", journalPrompt);
  intentMap.set("Journal Prompt Intent - Another", journalPromptFollowup);
  intentMap.set("Take Break Intent", takeBreak);
  intentMap.set("Take Break Intent - Another", takeBreakFollowup);
  agent.handleRequest(intentMap);
});

app.listen(PORT, () =>
  console.log(`It's alive! Server is running on http://localhost:${PORT}`)
);
