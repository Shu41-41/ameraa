const { Util, MessageEmbed } = require("discord.js")

module.exports.execute = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const embed = new MessageEmbed().setColor(client.randomColor()).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }));

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => x.name.match(new RegExp(args.join(' '), 'gi')));
    if (!args[0] || !role || role.id === message.guild.id) return message.reply('rol bulunamadı, bir rol belirt!');
   return message.channel.send(embed.setDescription(` ${role.members.array().map((x) => x.toString()).join(', ')}`).setAuthor(`Rol: ${role.name} | ${role.id} (${role.members.size < 1 ? 'Bu rolde hiç üye yok!' : role.members.size})`));


};

module.exports.configuration = {
    name: 'role-say',
    aliases: ["rolsay"],
    usage: 'role-say',
    description: 'Yetkili yoklaması.',
    permLevel: 0
};