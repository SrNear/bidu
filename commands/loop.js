const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "coloca a fila de música em loop",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Loop is now ${queue.loop ? "**Ligado**" : "**Desligado**"}`)
      .catch(console.error);
  }
};
