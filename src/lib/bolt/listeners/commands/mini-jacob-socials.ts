import type {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt";

const socials: Record<string, string> = {
  website: "https://your-website.com",
  instagram: "https://instagram.com/yourusername",
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourusername",
};

const miniJacobSocialsCommand = async ({
  ack,
  command,
  respond,
  logger,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();

    const args = command.text.trim().toLowerCase();

    if (!args) {
      await respond("Usage: `/mini-jacob-socials <website|instagram|github|twitter>`");
      return;
    }

    const link = socials[args];

    if (!link) {
      await respond(`Unknown social: *${args}*. Try one of: ${Object.keys(socials).join(", ")}`);
      return;
    }

    await respond(`Here’s Jacob’s **${args}**: ${link}`);
  } catch (error) {
    logger.error(error);
  }
};

export default miniJacobSocialsCommand;
