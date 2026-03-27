import type { App } from "@slack/bolt";
import sampleCommandCallback from "./sample-command";
import miniJacobTestCommand from "./mini-jacob-test";

const register = (app: App) => {
  app.command("/sample-command", sampleCommandCallback);
  app.command("/mini-jacob-test", miniJacobTestCommand);
};

export default { register };
