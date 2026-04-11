import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";

export const triggerHackanomous = async ({
  event,
  client,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
  try {
    const text = (event.text || "").toLowerCase();

    // Detect the keyword
    if (text.includes("hackanomous")) {
      await client.chat.postMessage({
        channel: event.channel,
        thread_ts: event.thread_ts || event.ts, // reply in thread (or create one)
        text: `<@U0AEYDUCLKF> hackanomous detected 👀`,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
