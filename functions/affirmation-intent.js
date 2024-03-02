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

const convertAffirmationType = (affirmationType) => {
  console.log("affirmation type: ", affirmationType);
  if (positivity.includes(affirmationType) || affirmationType === "")
    affirmationType = "positivity";
  else if (mindfulness.includes(affirmationType))
    affirmationType = "mindfulness";
  else if (confidence.includes(affirmationType)) affirmationType = "confidence";
  else if (love.includes(affirmationType)) affirmationType = "self-love";
  else affirmationType = "none";
  return affirmationType;
};

function affirmationIntent(agent) {
  const affirmationType = agent.parameters.AffirmationType;
  let conv = `This is the affirmation intent!`;

  // check for affirmation type
  let new_affirmationType = convertAffirmationType(affirmationType);

  if (new_affirmationType !== "none") {
    conv = `Here's an affirmation on ${new_affirmationType}`;
  } else {
    conv = `sorry, i don't have an affirmation like that.`;
  }
  agent.add(conv);
}

module.exports = affirmationIntent;
