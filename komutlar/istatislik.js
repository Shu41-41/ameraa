const { MessageEmbed } = require('discord.js');
const Member = require('../Models/Member.js');
const Penalty = require('../Models/Penalty.js');

module.exports.execute = async (client, message, args, ayar, emoji) => {
    if(![ayar.sahipRolu].some(role => message.member.roles.cache.has(role)) && message.channel.id === ayar.chatKanali) return message.react(emoji.iptal);
    if(!client.kullanabilir(message.author.id) &&  !message.member.roles.cache.array().some(rol => message.guild.roles.cache.get(ayar.enAltYetkiliRolu).rawPosition <= rol.rawPosition)) return  message.react(emoji.iptal);
    let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(' ').toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanici);
    const embed = new MessageEmbed().setColor("2F3136").setAuthor(kullanici.tag.replace('`', ''), kullanici.avatarURL({dynamic: true, size: 2048})).setThumbnail(kullanici.avatarURL({dynamic: true, size: 2048}))
        .addField('__**Kullanıcı Bilgisi**__', `\`ID:\` ${kullanici.id}\n\`Profil:\` ${kullanici}\n\`Durum:\` ${kullanici.presence.activities[0] ? kullanici.presence.activities[0].name + ` ${(kullanici.presence.activities[0].type)}`.replace('PLAYING', 'Oynuyor').replace('STREAMING', 'Yayında').replace('LISTENING', 'Dinliyor').replace('WATCHING', 'İzliyor').replace('CUSTOM_STATUS', '') : (kullanici.presence.status).replace('offline', 'Görünmez/Çevrimdışı').replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin')}\n\`Oluşturulma Tarihi:\` ${kullanici.createdAt.toTurkishFormatDate()}\n\`Katılma Tarihi\`: ${uye.joinedAt.toTurkishFormatDate()}\n\`Katılım Sırası\`: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= uye.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}`);

    let yetkiliBilgisi = '';
    if(uye.roles.highest.position >= message.guild.roles.cache.get(ayar.enAltYetkiliRolu).position) {
        let teyitData = await Member.findOne({ guildID: message.guild.id, userID: uye.id });
        if (teyitData) {
            let erkekTeyit = teyitData.yetkili.get('erkekTeyit') || 0;
            let kizTeyit = teyitData.yetkili.get('kizTeyit') || 0;
            yetkiliBilgisi += `\`Teyitleri:\` ${erkekTeyit+kizTeyit} (**${erkekTeyit}** erkek, **${kizTeyit}** kiz)\n`;
        }
        let penaltiesData = await Penalty.find({ sunucuID: message.guild.id, yetkiliID: uye.id });
        let toplam = penaltiesData.length;
        let chatMute = penaltiesData.filter(c => c.cezaTuru === 'CHAT-MUTE').length;
        let sesMute = penaltiesData.filter(c => c.cezaTuru === 'VOICE-MUTE').length;
        let kick = penaltiesData.filter(c => c.cezaTuru === 'KICK').length;
        let ban = penaltiesData.filter(c => c.cezaTuru === 'BAN').length;
        let UYARI = penaltiesData.filter(c => c.cezaTuru === 'UYARI').length;
        let jail = penaltiesData.filter(c => c.cezaTuru === 'JAIL' || c.cezaTuru === 'TEMP-JAIL').length;
        yetkiliBilgisi += `Toplam **${toplam}** yetki komutu kullanmış
        (**${UYARI}** uyarma  **${chatMute}** chatmute | **${sesMute}** ses mute, **${jail}** jail, **${kick}** atma, **${ban}** yasaklama)`;
    }
    if (uye) {
        embed.addField('__**Yetki Kullanım Bilgisi**__', `${yetkiliBilgisi}`);
    }
    return message.channel.send(embed);
};
module.exports.configuration = {
    name: 'info',
    aliases: ["info"],
    usage: 'istatistik [üye]',
    description: 'Belirtilen üyenin tüm bilgilerini gösterir.',
    permLevel: 0
};