import type { App } from "@slack/bolt";
import { appHomeOpenedCallback } from "./app-home-opened";
import userJoinedChannel from "./user-joined-channel";

const register = (app: App) => {
  app.event("app_home_opened", appHomeOpenedCallback);
  app.event("member_joined_channel", userJoinedChannel);
};

export default { register };
