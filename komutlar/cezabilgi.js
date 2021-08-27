/* eslint-disable linebreak-style */
const { MessageEmbed } = require('discord.js');
const Penalty = require('../Models/Penalty.js');
module.exports.execute = async (client, message, args, ayar, emoji) => {
    if(![ayar.sahipRolu].some(role => message.member.roles.cache.has(role)) && message.channel.id === ayar.chatKanali) return message.react(emoji.iptal);

    if(!client.kullanabilir(message.author.id) && !ayar.jailciRolleri.some(rol => message.member.roles.cache.has(rol))) return  message.react(emoji.iptal);

    const cezaBilgiEmbed = new MessageEmbed().setColor(client.randomColor()).setDescription('`Belirtilen ID numarasına sahip bir ceza verisi bulunamadı!`');
    const ID = args[0];
    if (!ID || isNaN(ID)) return message.channel.send(cezaBilgiEmbed)
    Penalty.find({ sunucuID: message.guild.id }).exec(async(err, cezalar) => {
        const ceza = cezalar[ID];
        if (ceza) {
            const cezalandirilanUye = await client.users.fetch(ceza.uyeID);
            const cezalandiranYetkili = await client.users.fetch(ceza.yetkiliID);
            cezaBilgiEmbed.setDescription(`Ceza \`#${args[0]}\`\n\n• Cezalandırılan Üye: ${cezalandirilanUye ? `${cezalandirilanUye.toString()} (\`${cezalandirilanUye.tag}\` - \`${cezalandirilanUye.id}\`)` : `\`${ceza.uyeID}\``}\n• Cezalandıran Yetkili: ${cezalandiranYetkili ? `${cezalandiranYetkili.toString()} (\`${cezalandiranYetkili.tag}\` - \`${cezalandiranYetkili.id}\`)` : `\`${ceza.yetkiliID}\``}\n• Ceza Türü: \`${ceza.cezaTuru}\`\n• Ceza Atılma Tarihi: \`${new Date(ceza.atilmaTarihi).toTurkishFormatDate()}\`\n• Ceza Sebebi: \`${ceza.cezaSebebi}\`\n• Ceza Bitiş Tarihi: \`${ceza.bitisTarihi ? new Date(ceza.bitisTarihi).toTurkishFormatDate() : 'Belirtilmemiş!'}\``);
           return message.channel.send(cezaBilgiEmbed).catch(() => {
                return undefined;

            });
        }
    });
};
module.exports.configuration = {
    name: 'cezabilgi',
    aliases: ['ceza-bilgi', 'cezasorgu', 'ceza-sorgu'],
    usage: 'cezabilgi cezaID',
    description: 'Belirtilen ceza hakkında detaylı bilgi verir.',
    permLevel: 0
};