const { MessageEmbed } = require('discord.js');

module.exports.execute = async (client, message, args, conf, emoji) => {

  const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(client.randomColor());

  if (!message.member.roles.cache.has(conf.boosterRolu)) return message.react(emoji.iptal);
    const name = args.slice(0).join(' ');
    let isim;
    if (!name) return message.reply('Geçerli bir isim belirtmelisin.').then(x => x.delete({ timeout: 5000 }));
    isim = `${message.author.username.includes(conf.tag) ? conf.tag : conf.ikinciTag} ${name}`
    if(isim.length > 32) return message.reply(message, 'Maksimum 32 karakter sınırı var.').then(x => x.delete({ timeout: 10000 }));
    message.member.setNickname(isim);
    message.react(emoji.onay);
};

module.exports.configuration = {
    name: 'zengin',
    aliases: ["zengin","boost"],
    usage: 'zengin [isim]',
    description: 'İsminizi değiştirir.',
    permLevel: 0
};