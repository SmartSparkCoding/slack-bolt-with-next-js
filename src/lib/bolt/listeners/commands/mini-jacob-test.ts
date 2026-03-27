import type {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt";

const miniJacobTestCommand = async ({
  ack,
  command,
  client,
  logger,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();

    // Send a PUBLIC message to the channel
    await client.chat.postMessage({
      channel: command.channel_id,
      text: "Hey Jacob, wassup!",
    });

  } catch (error) {
    logger.error(error);
  }
};

export default miniJacobTestCommand;
