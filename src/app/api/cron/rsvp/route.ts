export async function GET() {
  const message = await getRSVPMessage();

  const userId = "U0AEYDUCLKF";

  const dm = await client.conversations.open({
    users: userId
  });

  await client.chat.postMessage({
    channel: dm.channel.id,
    text: message
  });

  return NextResponse.json({ success: true });
}
