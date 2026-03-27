import type {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt";

const socials: Record<string, string> = {
  website: "https://jacob-personal-website.pages.dev/",
};

const miniJacobSocialsCommand = async ({
  ack,
  command,
  client,
  logger,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();

    const args = command.text.trim().toLowerCase();
    const link = socials[args];

    if (!args || !link) {
      await client.chat.postMessage({
        channel: command.channel_id,
        text: `Unknown social: ${args}. Try: website`,
      });
      return;
    }

    await client.chat.postMessage({
      channel: command.channel_id,
      text: `@U0AEYDUCLKF ’s ${args}: ${link}`,
    });

  } catch (error) {
    logger.error(error);
  }
};

export default miniJacobSocialsCommand;
