const { MessageEmbed } = require('discord.js');
const Member = require('../Models/Member.js');

module.exports.execute = async(client, message, args, ayar) => {
    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setThumbnail(message.guild.iconURL({dynamic: true})).setColor('RANDOM');
    if (!client.kullanabilir(message.author.id) && !ayar.teyitciRolleri.some(r => message.member.roles.cache.has(r))) return global.send(message.channel, embed.setDescription('Gerekli rollere sahip değilsin!')).then(x => x.delete({ timeout: 5000 }));
    if(ayar.embedImage) embed.setImage(ayar.embedImage);
    Member.find({guildID: message.guild.id}).exec((err, data) => {
        let listedMembers = data.filter(d => message.guild.members.cache.has(d.userID) && d.yetkili && (d.yetkili.get('erkekTeyit') || d.yetkili.get('kizTeyit'))).sort((a, b) => Number((b.yetkili.get('erkekTeyit') || 0)+(b.yetkili.get('kizTeyit') || 0))-Number((a.yetkili.get('erkekTeyit') || 0)+(a.yetkili.get('kizTeyit') || 0))).map((uye, index) => `\`${index+1}.\` ${message.guild.members.cache.get(uye.userID).toString()} | \`${client.sayilariCevir((uye.yetkili.get('erkekTeyit') || 0) + (uye.yetkili.get('kizTeyit') || 0))} teyit\``).splice(0, 30);
        message.channel.send( embed.setDescription(`**Top Teyit Listesi**\n\n${listedMembers.join('\n') || 'Teyit verisi bulunamadı!'} `)).then(x => x.delete({ timeout: 10000 }));
            return undefined;
        });
    
};
module.exports.configuration = {
    name: 'topteyit',
    aliases: ['top-teyit', 'teyit-top'],
    usage: 'topteyit',
    description: 'Top teyit istatistikleri.',
    permLevel: 0
};