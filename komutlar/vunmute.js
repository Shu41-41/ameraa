const { MessageEmbed } = require("discord.js");
const Penalty = require('../Models/Penalty.js');
var banLimitleri = new Map();

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
  if(!client.kullanabilir(message.author.id) && !ayar.sesMuteciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.channel.send(embed.setDescription('`Yeterli Yetkin Bulunmamakta.`')).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (banLimitleri.get(message.author.id) >= ayar.banLimit) return message.reply(message, `\`${this.configuration.name} komutu için limite ulaştın!\``);
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription('Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!')).then(x => x.delete({timeout: 5000}));
  Penalty.find({sunucuID: message.guild.id, uyeID: uye.id}).exec((err, data) => {
    data.filter(d => (d.cezaTuru === "VOICE-MUTE") && (!d.bitisTarihi || d.bitisTarihi > Date.now())).forEach(d => {
      d.bitisTarihi = Date.now();
      d.save();
      banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))+1);
    setTimeout(() => {
        banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))-1);
    }, 1000*60*3);
    });
  });
    if(uye.voice.channelID) uye.voice.setMute(false).catch(console.error);
 message.channel.send( embed.setDescription(`${uye} üyesinin, ${message.author} tarafından mutesi kaldırıldı!`)).then(x => x.delete({ timeout: 10000 }));
   if(ayar.muteLogKanali && client.channels.cache.has(ayar.muteLogKanali)) client.channels.cache.get(ayar.muteLogKanali).send(embed.setDescription(`${uye} üyesinin, ${message.author} tarafından **Sesmutesi** kaldırıldı!`)).catch(console.error);
};
module.exports.configuration = {
  name: "vunmute",
  aliases: [],
  usage: "vunmute [üye] [Sesmutesini açar]",
  description: "Belirtilen üyeyi jailden çıkarır.",
  permLevel: 0
};