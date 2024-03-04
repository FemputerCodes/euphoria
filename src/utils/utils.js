const getRandom = (len) => {
  const random = Math.floor(Math.random() * len);
  return random;
};

// affirmation types
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

// journal prompt types
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

module.exports = { getRandom, convertAffirmationType, convertPromptType };
