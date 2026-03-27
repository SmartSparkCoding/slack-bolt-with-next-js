import { App } from "@slack/bolt";
import { VercelReceiver } from "@vercel/slack-bolt";
import registerListeners from "./listeners";

const receiver = new VercelReceiver();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  receiver,
  deferInitialization: true,
});

registerListeners(app);

// --- Auto-join all channels Jacob is in ---
async function joinAllChannels(app: App) {
  try {
    const result = await app.client.users.conversations({
      user: "U0AEYDUCLKF", // Jacob's Slack user ID
      types: "public_channel,private_channel",
    });

    for (const channel of result.channels) {
      try {
        await app.client.conversations.join({
          channel: channel.id,
        });
      } catch (e) {
        // Ignore errors like "already_in_channel"
      }
    }
  } catch (error) {
    console.error("Error joining channels:", error);
  }
}

joinAllChannels(app);

export { app, receiver };
