function fallbackIntent(agent) {
  agent.add(`I didn't understand`);
  agent.add(`I'm sorry, can you try again?`);
}

module.exports = fallbackIntent;