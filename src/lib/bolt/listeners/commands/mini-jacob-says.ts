import type {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt";

const miniJacobSaysCommand = async ({
  ack,
  command,
  client,
  logger,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();

    const text = command.text.trim();

    if (!text) {
      await client.chat.postMessage({
        channel: command.channel_id,
        text: "You need to type a message after the command.",
      });
      return;
    }

    await client.chat.postMessage({
      channel: command.channel_id,
      text: text,
    });

  } catch (error) {
    logger.error(error);
  }
};

export default miniJacobSaysCommand;
