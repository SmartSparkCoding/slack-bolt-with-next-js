await app.command("/mini-jacob-rsvp", async ({ ack, client }) => {
  await ack();

  const message = await getRSVPMessage();

  const userId = "U0AEYDUCLKF"; 
  
  // Open DM
  const dm = await client.conversations.open({
    users: userId
  });

  // Send message
  await client.chat.postMessage({
    channel: dm.channel.id,
    text: message
  });
});
