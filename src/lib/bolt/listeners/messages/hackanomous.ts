import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";

const triggerHackanomous = async ({
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

    // ❌ STOP if message is inside a thread (SAFE CHECK)
    if ("thread_ts" in event && event.thread_ts) return;

    // Prevent bot loops
    if ("subtype" in event && event.subtype === "bot_message") return;

    // Detect keyword
    if (!event.text.toLowerCase().includes("hackanomous")) return;

    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      text: "<@U0AEYDUCLKF>",
    });
  } catch (error) {
    logger.error(error);
  }
};

export default triggerHackanomous;
