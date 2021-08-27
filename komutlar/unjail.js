const { MessageEmbed } = require("discord.js");
const Penalty = require('../Models/Penalty.js');
var banLimitleri = new Map();

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
  if(!client.kullanabilir(message.author.id) && !ayar.jailciRolleri(r => message.member.roles.cache.has(r))) return message.channel.send( embed.setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send( embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (banLimitleri.get(message.author.id) >= ayar.banLimit) return message.reply(message, `\`${this.configuration.name} komutu için limite ulaştın!\``);
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription('Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!')).then(x => x.delete({timeout: 5000}));
  Penalty.find({sunucuID: message.guild.id, uyeID: uye.id}).exec((err, data) => {
    data.filter(d => (d.cezaTuru === "TEMP-JAIL" || d.cezaTuru === "JAIL") && (!d.bitisTarihi || d.bitisTarihi > Date.now())).forEach(d => {
      d.bitisTarihi = Date.now();
      d.save();
      banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))+1);
    setTimeout(() => {
        banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))-1);
    }, 1000*60*3);
    });
  });
  await uye.roles.set(uye.roles.cache.has(ayar.boosterRolu) ? ayar.teyitsizRolleri.concat(ayar.boosterRolu) : ayar.teyitsizRolleri).catch();
  if(uye.voice.channelID) uye.voice.kick().catch();
    message.channel.send(embed.setDescription(`${uye} üyesinin ${message.guild.roles.cache.get(ayar.jailRolu).toString()} rolü, ${message.author} tarafından alındı!`)).then(x => x.delete({ timeout: 10000 }));
  if(ayar.jailLogKanali && client.channels.cache.has(ayar.jailLogKanali)) client.channels.cache.get(ayar.jailLogKanali).send(embed.setDescription(`${uye} üyesinin ${message.guild.roles.cache.get(ayar.jailRolu).toString()} rolü, ${message.author} tarafından alındı!`)).catch();
};
module.exports.configuration = {
  name: "unjail",
  aliases: ["uncezalı"],
  usage: "unjail [üye]",
  description: "Belirtilen üyeyi jailden çıkarır.",
  permLevel: 0
};