import type { App } from "@slack/bolt";
import botMentionListener from "./bot-mention";
import jacobMentionListener from "./jacob-mention";

const register = (app: App) => {
  app.event("app_mention", botMentionListener);
  app.message(jacobMentionListener);
};

export default { register };
