import type { App } from "@slack/bolt";
import botMentionListener from "./bot-mention";
import jacobMentionListener from "./jacob-mention";
import triggerHackanomous from "./hackanomous";

const register = (app: App) => {
  app.event("app_mention", botMentionListener);
  app.message(jacobMentionListener);
  app.message(triggerHackanomous);
};

export default { register };
