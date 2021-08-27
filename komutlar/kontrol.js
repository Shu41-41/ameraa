const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar) => {
    if(message.mentions.roles.first() || message.guild.roles.cache.get(args[0])) {
        let members = message.guild.members.cache.filter(member => member.roles.cache.has(message.mentions.roles.first() || message.guild.roles.cache.get(args[0])) && !member.user.bot && !member.voice.channelID && member.presence.status !== 'offline');
        members = sesteOlmayanlar.map(x => x.toString());
        members.forEach(uye => 
            uye.send([
                `**${message.guild.name}** adlı sunucuda sese girmeniz rica olunur aksi takdirde yükseltiminizde göz önünde bulundurulacaktır.`,
                `${message.guild.vanityURLCode ? `https://discord.gg/${message.guild.vanityURLCode}` : ''}`
            ]).catch(() => {
                return undefined;
        }));
        message.channel.send(`${members.slice(0, members.length / 2).join(', ')}`, { split: true });
        message.channel.send(`${members.slice(members.length / 2).join(', ')}`, { split: true });
        return;
    }
    const enAltYetkiliRolu = message.guild.roles.cache.get(ayar.enAltYetkiliRolu);
    let members = message.guild.members.cache.filter(member => member.roles.highest.position >= enAltYetkiliRolu.position);
    let sesteOlmayanlar = members.filter(member => !member.user.bot && !member.voice.channelID && member.presence.status !== 'offline');
    sesteOlmayanlar.forEach(uye => 
        uye.send([
            `**${message.guild.name}** adlı sunucuda sese girmeniz rica olunur aksi takdirde yükseltiminizde göz önünde bulundurulacaktır.`,
            `${message.guild.vanityURLCode ? `https://discord.gg/${message.guild.vanityURLCode}` : ''}`
        ]).catch(() => {
            return undefined;
        }));
    sesteOlmayanlar = sesteOlmayanlar.map(x => x.toString());
    message.channel.send(`${sesteOlmayanlar.slice(0, sesteOlmayanlar.length / 2).join(', ')}`, { split: true });
    message.channel.send(`${sesteOlmayanlar.slice(sesteOlmayanlar.length / 2).join(', ')}`, { split: true });
    message.channel.send("`Müsait olan yetkililerimizi seslere bekliyoruz.`")
};
module.exports.configuration = {
    name: 'yetkili-say',
    aliases: ['yetkilisay'],
    usage: 'yetkili-say',
    description: 'Yetkili yoklaması.',
    permLevel: 2
};