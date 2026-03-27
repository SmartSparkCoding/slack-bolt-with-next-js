import type { App } from "@slack/bolt";
import sampleCommandCallback from "./sample-command";
import miniJacobTestCommand from "./mini-jacob-test";
import miniJacobSocialsCommand from "./mini-jacob-socials";

const register = (app: App) => {
  app.command("/sample-command", sampleCommandCallback);
  app.command("/mini-jacob-test", miniJacobTestCommand);
  app.command("/mini-jacob-socials", miniJacobSocialsCommand);
};

export default { register };
