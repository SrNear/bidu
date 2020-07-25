const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "pular um numero de músicas",
  execute(message, args) {
    if (!args.length) return message.reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ pulou ${args[0] - 1} músicas`).catch(console.error);
  }
};
