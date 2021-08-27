const { MessageEmbed } = require("discord.js");
const Penalty = require('../Models/Penalty.js');

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(ayar.durum).setColor(client.randomColor()).setTimestamp();
    if(!client.kullanabilir(message.author.id) && !ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipyedek)) return message.channel.send(embed.setDescription('`Yeterli Yetkin Bulunmamakta.`')).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if(!uye || !reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
   let newPenalty = new Penalty({
        sunucuID: message.guild.id,
        uyeID: uye.id,
        yetkiliID: message.author.id,
        cezaTuru: "UYARI",
        cezaSebebi: reason,
        atilmaTarihi: Date.now(),
        bitisTarihi: null,
      });
      newPenalty.save();
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle uyarıldı!`)).then(x => x.delete({timeout: 5000}));
  if(ayar.uyariLogKanali && client.channels.cache.has(ayar.uyariLogKanali)) client.channels.cache.get(ayar.uyariLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle uyarıldı!`)).catch();
};
module.exports.configuration = {
  name: "uyarı",
  aliases: ['sustur'],
  usage: "uyarı [üye] [sebep]",
  description: "Belirtilen üyeyi uyarır."
};