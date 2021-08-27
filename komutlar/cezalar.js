const Penalty = require('../Models/Penalty.js');
const { MessageEmbed } = require('discord.js');

module.exports.execute = async (client, message, args, ayar, emoji) => {
    if(![ayar.sahipRolu].some(role => message.member.roles.cache.has(role)) && message.channel.id === ayar.chatKanali) return message.react(emoji.iptal);

    if(!client.kullanabilir(message.author.id) && !ayar.jailciRolleri.some(rol => message.member.roles.cache.has(rol))) return  message.react(emoji.iptal);
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.reply('Geçerli bir üye belirtmelisin!').then(x => x.delete({timeout: 5000}));
    const embed = new MessageEmbed().setColor(client.randomColor()).setAuthor(uye.user.tag, uye.user.avatarURL({dynamic: true, size: 2048}));
    Penalty.find({sunucuID: message.guild.id, uyeID: uye.id}).exec((err, cezalar) => {
        cezalar = cezalar.filter(c => !c.bitisTarihi || c.bitisTarihi > Date.now()).sort((c1, c2) => Number(c2.atilmaTarihi)-Number(c1.atilmaTarihi));
        const cezaBilgi = (ceza) => `• Cezalandıran Yetkili: ${ceza ? `${message.guild.members.cache.has(ceza.yetkiliID) ? `${message.guild.members.cache.get(ceza.yetkiliID).toString()} (\`${ceza.yetkiliID}\`)` : `${ceza.yetkiliID}`}\n• Cezalandırma Tarihi: \`${new Date(ceza.atilmaTarihi).toTurkishFormatDate()}\`\n• Bitiş Tarihi: \`${ceza.bitisTarihi ? new Date(ceza.bitisTarihi).toTurkishFormatDate() : 'Belirtilmemiş!'}\`\n• Ceza Sebebi: \`${ceza.cezaSebebi}\`` : '\`Herhangi bir ses mute bulunamadı!\`'}`;
        embed.addField('Cezalı Bilgisi', cezaBilgi(cezalar.filter(c => c.cezaTuru === 'JAIL' || c.cezaTuru === 'TEMP-JAIL')[0]));
        embed.addField('Chat Mute Bilgisi', cezaBilgi(cezalar.filter(c => c.cezaTuru === 'CHAT-MUTE')[0]));
        embed.addField('Ses Mute Bilgisi', cezaBilgi(cezalar.filter(c => c.cezaTuru === 'VOICE-MUTE')[0]));
       return message.channel.send(embed).then(x => x.delete({ timeout: 10000 }));
    });
};
module.exports.configuration = {
    name: 'cezalar',
    aliases: ['penalties'],
    usage: 'cezalar [üye]',
    description: 'Belirtilen ceza hakkında detaylı bilgi verir.',
    permLevel: 0
};