import { App } from "@slack/bolt";
import { VercelReceiver } from "@vercel/slack-bolt";
import registerListeners from "./listeners";

// ✅ ADD THIS LINE
import registerRSVPCommand from "./listeners/commands/rsvp";

const receiver = new VercelReceiver();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  receiver,
  deferInitialization: true,
});

// Wrap async logic in an IIFE to avoid top-level await
(async () => {
  await app.init();

  // Auto-join all channels Jacob is in
  try {
    const result = await app.client.users.conversations({
      user: "U0AEYDUCLKF",
      types: "public_channel,private_channel",
    });

    for (const channel of result.channels ?? []) {
      try {
        await app.client.conversations.join({
          channel: channel.id!,
        });
      } catch {
        // ignore "already_in_channel" errors
      }
    }
  } catch (error) {
    console.error("Error joining channels:", error);
  }
})();

// existing listeners
registerListeners(app);

// ✅ ADD THIS LINE
registerRSVPCommand(app);

export { app, receiver };
