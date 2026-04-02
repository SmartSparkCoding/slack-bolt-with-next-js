export default function registerRSVPCommand(app: any) {
  app.command("/mini-jacob-rsvp", async ({ ack, client }: any) => {
    await ack();

    const message = await getRSVPMessage();

    const userId = "U0AEYDUCLKF";

    const dm = await client.conversations.open({
      users: userId,
    });

    await client.chat.postMessage({
      channel: dm.channel.id,
      text: message,
    });
  });
}
