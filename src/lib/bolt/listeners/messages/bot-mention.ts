import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";

const funnyMessages = [
  "Did someone say my name or am I hearing things again?",
  "You rang? I was in the middle of a very important nap.",
  "Behold, it is I — the legendary Mini Jacob.",
  "What’s up? I charge £5 per summon.",
  "Oh hey, didn’t see you there. Totally wasn’t eavesdropping.",
  "You summoned me like a Pokémon. Respect.",
  "Hello human. I bring chaos and vibes.",
  "I heard my name and sprinted over like a golden retriever.",
  "What’s good? I’m here, I’m small, I’m Jacob.",
  "You called? I respond faster than your WiFi.",
];

const botMentionListener = async ({
  event,
  client,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"app_mention">) => {
  try {
    const random = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts, // replies in thread (optional)
      text: random,
    });
  } catch (error) {
    logger.error(error);
  }
};

export default botMentionListener;
