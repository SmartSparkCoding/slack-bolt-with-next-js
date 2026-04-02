import { NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { getRSVPMessage } from "../../../../lib/rsvp"; // ✅ use RELATIVE PATH

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

export async function GET() {
  const message = await getRSVPMessage();

  const userId = "U0AEYDUCLKF";

  const dm = await client.conversations.open({
    users: userId
  });

  await client.chat.postMessage({
    channel: dm.channel.id!,
    text: `🌙 Midnight Update\n\n${message}`
  });

  return NextResponse.json({ success: true });
}
