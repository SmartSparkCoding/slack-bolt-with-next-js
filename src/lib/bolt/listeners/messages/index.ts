import type { App } from "@slack/bolt";
import { sampleMessageCallback } from "./sample-message";
import botMentionListener from "./bot-mention";
import jacobMentionListener from "./jacob-mention";

const register = (app: App) => {
  app.message(/^hello.*/, sampleMessageCallback);
  app.event("app_mention", botMentionListener);
  app.message(jacobMentionListener);
};

export default { register };
