import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";

const userJoinedChannel = async ({
  event,
  client,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"member_joined_channel">) => {
  try {
    // Only react when YOU join a channel
    if (event.user !== "YOUR_USER_ID") return;

    await client.conversations.join({
      channel: event.channel,
    });
  } catch (error) {
    logger.error(error);
  }
};

export default userJoinedChannel;
