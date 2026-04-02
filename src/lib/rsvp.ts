export async function getRSVPMessage() {
  const res = await fetch("https://rsvp.ysws.workers.dev/rsvp/count");
  const data = await res.json();

  const count = data.count;
  const max = 50;

  const percent = Math.min(count / max, 1);
  const barLength = 20;
  const filled = Math.round(barLength * percent);
  const empty = barLength - filled;

  const bar = "█".repeat(filled) + "░".repeat(empty);

  return `📊 RSVP Count: *${count}/50*\n[${bar}]`;
}
