import type {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt";

const ALLOWED_USERS = ["U0AEYDUCLKF"]; // ✅ your Slack ID

const miniJacobSaysCommand = async ({
  ack,
  command,
  client,
  logger,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();

    // 🚫 Block anyone not in allowed list
    if (!ALLOWED_USERS.includes(command.user_id)) {
      await client.chat.postEphemeral({
        channel: command.channel_id,
        user: command.user_id,
        text: "❌ You are not allowed to use this command.",
      });
      return;
    }

    const text = command.text.trim();

    if (!text) {
      await client.chat.postEphemeral({
        channel: command.channel_id,
        user: command.user_id,
        text: "You need to type a message after the command.",
      });
      return;
    }

    // ✅ Allowed → send message
    await client.chat.postMessage({
      channel: command.channel_id,
      text: text,
    });

  } catch (error) {
    logger.error(error);
  }
};

export default miniJacobSaysCommand;
