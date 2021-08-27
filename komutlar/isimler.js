/* eslint-disable linebreak-style */
const Database = require('../Models/Member.js');
const { MessageEmbed } = require('discord.js');

module.exports.execute = async (client, message, args, conf) => {
    const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(client.randomColor());
    const kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(' ').toLowerCase())).first() : message.author) || message.author;
    let member = message.guild.member(kullanici);
    if (!client.kullanabilir(message.author.id) && !conf.teyitciRolleri.some(r => message.member.roles.cache.has(r))) return message.channel.send(embed.setDescription('Gerekli rollere sahip değilsin!')).then(x => x.delete({ timeout: 5000 }));
    if (!member) return message.reply('Geçerli bir sunucu üyesi belirtmelisin!').then(x => x.delete({ timeout: 5000 }));
    const memberData = await Database.findOne({ userID: member.id }) || {};
    const historyData = memberData.history || [];
    if(!memberData.history) return message.channel.send(embed.setAuthor(member.displayName, kullanici.avatarURL({ dynamic: true })).setDescription('`Üyenin herhangi bir kayıtı bulunamadı.`'));
    message.channel.send(embed.setAuthor(member.displayName, kullanici.avatarURL({ dynamic: true })).setDescription([
        `Bu üyenin toplamda ${historyData.length} isim kayıtı bulundu:\n`,
        historyData.map((x) => `\`${x.name}\` (<@&${x.role}>)`).join('\n')
    ])).then((x) => x.delete({ timeout: 5000 }));
};
module.exports.configuration = {
    name: 'isimler',
    aliases: [],
    usage: 'isimler [üye]',
    description: 'Belirtilen üyenin tüm sicilini gösterir.',
    permLevel: 0
};