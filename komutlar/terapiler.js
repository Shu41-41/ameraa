const { MessageEmbed } = require('discord.js');
const Terapi = require('../Models/Terapi.js');
module.exports.execute = async (client, message, args, ayar, emoji) => {
    if(message.channel.id == ayar.chatKanali) return message.reply("`Kanalı Kirletme Bebeğim!`").then(x => x.delete({ timeout: 10000 }));


    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!uye || uye.user.bot) return message.reply("Geçerli bir üye belirtmelisin!");
    let terapiler = [];
    if (ayar.terapistRolu.some(r => message.member.roles.cache.has(r))) {
        terapiler = await Terapi.find({ yetkiliID: uye.id }) || [];
        terapiler = terapiler.filter(a => message.guild.members.cache.has(a.uyeID)).map((a, index) => `\`${index+1}.\` ${message.guild.members.cache.get(a.uyeID)} | \`${client.convertDuration(a.bitisTarihi-a.baslangicTarihi)}\``).join('\n');
        client.splitEmbedWithDesc(`**${uye} terapistinin terapileri;**\n\n${terapiler}`,
            { name: message.guild.name, icon: message.guild.iconURL({ dynamic: true, size: 2048 }) },
            false,
            { setColor: ['BLUE'] }).then(list => {
            list.forEach(item => {
                message.channel.send(item).then(x => x.delete({ timeout: 10000 }));
            });
        });
    } else {
        terapiler = await Terapi.find({ uyeID: uye.id }) || [];
        terapiler = terapiler.filter(a => message.guild.members.cache.has(a.yetkiliID)).map((a, index) => `\`${index+1}.\` ${message.guild.members.cache.get(a.yetkiliID)} | \`${client.convertDuration(a.bitisTarihi-a.baslangicTarihi)}\``).join('\n');
        client.splitEmbedWithDesc(`**${uye} üyesinin terapileri;**\n\n${terapiler}`,
            { name: message.guild.name, icon: message.guild.iconURL({ dynamic: true, size: 2048 }) },
            false,
            { setColor: ['BLUE'] }).then(list => {
            list.forEach(item => {
                message.channel.send(item).then(x => x.delete({ timeout: 10000 }));
            });
        });
    }
};
module.exports.configuration = {
    name: 'terapiler',
    aliases: [],
    usage: 'terapiler [terapist/uye]',
    description: 'Belirtilen terapistin terapilerini gösterir.',
    permLevel: 0
};