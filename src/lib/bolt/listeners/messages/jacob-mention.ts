import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";

const locatingMessages = [
  "Locating Jacob… please stand by.",
  "Scanning for Jacob…",
  "Jacob detected. He is probably causing chaos.",
  "Attempting to ping Jacob… response pending.",
  "Jacob is nearby. I can smell the productivity.",
  "Jacob’s signal is weak… boosting antenna…",
  "Tracking Jacob… he moves fast.",
  "Jacob is online. Probably.",
  "Searching for Jacob… found 1 result.",
  "Jacob located. He says hi.",
];

const jacobMentionListener = async ({
  event,
  client,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
  try {
    // Only handle real user messages with text
    if (
      event.type !== "message" ||
      !("text" in event) ||
      typeof event.text !== "string"
    ) {
      return;
    }

    // Check if someone mentioned Jacob
    if (!event.text.includes("<@U0AEYDUCLKF>")) return;

    const random =
      locatingMessages[Math.floor(Math.random() * locatingMessages.length)];

    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      text: random,
    });
  } catch (error) {
    logger.error(error);
  }
};

export default jacobMentionListener;
