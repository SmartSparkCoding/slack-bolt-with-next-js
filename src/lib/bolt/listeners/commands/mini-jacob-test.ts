import type {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt";

const miniJacobTestCommand = async ({
  ack,
  respond,
  logger,
}: AllMiddlewareArgs & SlackCommandMiddlewareArgs) => {
  try {
    await ack();
    await respond("Hey Jacob, wassup!");
  } catch (error) {
    logger.error(error);
  }
};

export default miniJacobTestCommand;
