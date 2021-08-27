const { MessageEmbed } = require('discord.js');


module.exports.execute = async (client, message, args, ayar, emoji) => {
    //const emojii = client.emojis.cache.get('758485422904180786').toString();
 if(![ayar.sahipRolu].some(role => message.member.roles.cache.has(role)) && message.channel.id === ayar.chatKanali) return message.react(emoji.iptal);
    if(!client.kullanabilir(message.author.id) &&  !message.member.roles.cache.array().some(rol => message.guild.roles.cache.get(ayar.enAltYetkiliRolu).rawPosition <= rol.rawPosition)) return  message.react(emoji.iptal);
 
let boostcuk = ayar.boosterRolu
let boost = message.guild.members.cache.filter(r => r.roles.cache.has(boostcuk)).size;
let onlineUsers2 = message.guild.members.cache.filter(m => m.user.username.includes(ayar.tag)).size;
    const embed = new MessageEmbed().setColor('2F3136').setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(message.member.displayName, message.author.avatarURL({dynamic: true}))
 message.channel.send(embed.setDescription(`
 <a:sonsuz_Miroslava:800945759390138368> Sunucumuzda \`${message.guild.memberCount}\` üye bulunmaktadır. 
 <a:sonsuz_Miroslava:800945759390138368> Anlık Olarak **aktif** \`${message.guild.members.cache.filter(u => u.presence.status != 'offline').size}\` kullanıcı bulunmaktadır.
 <a:sonsuz_Miroslava:800945759390138368> Tagımızda \`${onlineUsers2}\` kullanıcı bulunmaktadır.(**Aktif** \`${message.guild.members.cache.filter((m => m.user.username.includes("✧") && m.presence.status!='offline')).size}\`)
 <a:sonsuz_Miroslava:800945759390138368> Sunucumuzda \`${boost}\` tane booster bulunmaktadır
 <a:sonsuz_Miroslava:800945759390138368> **Ses kanallarında** \`${message.guild.channels.cache.filter(channel => channel.type == 'voice').map(channel => channel.members.size).reduce((a, b) => a + b)}\` kişi bulunmaktadır.`)

).then(x => x.delete({ timeout: 15000 }));
}
module.exports.configuration = {
    name: 'say',
    aliases: ['count','yoklama'],
    usage: 'say',
    description: 'Sunucu sayımı.',
    permLevel: 0
};
