const { MessageEmbed } = require('discord.js');
const Terapi = require('../Models/Terapi.js');
module.exports.execute = async (client, message, args, ayar, emoji) => {
    if(message.channel.id == ayar.chatKanali) return message.reply("`Kanalı Kirletme Bebeğim!`").then(x => x.delete({ timeout: 10000 }));

    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!uye || !uye.voice.channelID || uye.voice.channelID !== message.member.voice.channelID || uye.id === message.author.id || uye.user.bot) return message.reply( "Geçerli bir üye belirtmelisin!").then(x => x.delete({ timeout: 10000 }));
    if (args[0] === "başlat") {
        if (Object.values(client.terapiler).some(x => x.yetkiliID === message.author.id)) return message.reply("Zaten bir terapin bulunmakta!").then(x => x.delete({ timeout: 10000 }));
        if (client.terapiler[uye.id]) return message.reply( "Belirtilen üyenin devam eden bir terapisi bulunmakta!").then(x => x.delete({ timeout: 10000 }));
        client.terapiler[uye.id] = {
            yetkiliID: message.author.id,
            baslangicTarihi: Date.now()
        };
        message.reply( "Belirtilen üye ile terapiye başlandı! Bitirmek için **bitir @üye** argümanını kullanınız.").then(x => x.delete({ timeout: 10000 }));
    };

    if (args[0] === "bitir") {
        if (!client.terapiler[uye.id]) return message.reply( "Belirtilen üyenin devam eden bir terapisi bulunmamakta!");
        if (client.terapiler[uye.id].yetkiliID !== message.author.id) return message.reply( "Terapiyi başlatan kişi bitirebilir! " + `(<@${client.terapiler[uye.id].yetkiliID}>)`).then(x => x.delete({ timeout: 10000 }));
        let bitisTarihi = Date.now();
        let newTerapi = new Terapi({
            sunucuID: message.guild.id,
            uyeID: uye.id,
            yetkiliID: message.author.id,
            baslangicTarihi: client.terapiler[uye.id].baslangicTarihi,
            bitisTarihi: bitisTarihi
        });
        newTerapi.save();
        message.reply( "Belirtilen üye ile olan terapi sonlandı").then(x => x.delete({ timeout: 10000 }));
        client.channels.cache.get(ayar.terapiLog).send(new MessageEmbed().setDescription(`${uye} üyesinin terapisi sonlandı!\n\n• Terapi Gören Üye: ${uye} (\`${uye.user.tag}\` - \`${uye.id}\`)\n• Terapist: ${message.author} (\`${message.author.tag}\` - \`${message.author.id}\`)\n• Başlangıç Tarihi: \`${new Date(client.terapiler[uye.id].baslangicTarihi).toTurkishFormatDate()}\`\n• Bitiş Tarihi: \`${new Date(bitisTarihi).toTurkishFormatDate()}\`\n• Terapi Süresi: \`${client.convertDuration(bitisTarihi-client.terapiler[uye.id].baslangicTarihi)}\``)).then(x => x.delete({ timeout: 10000 }));
    };
};
module.exports.configuration = {
    name: 'terapi',
    aliases: [],
    usage: 'terapi başlat/bitir [üye]',
    description: 'Belirtilen ceza hakkında detaylı bilgi verir.',
    permLevel: 0
};