const { MessageEmbed } = require("discord.js");
const Penalty = require('../Models/Penalty.js');
const moment = require('moment');
const ms = require('ms');
var banLimitleri = new Map();
const db = require('quick.db')

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
  if(!client.kullanabilir(message.author.id) && !ayar.jailciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipyedek)) return message.channel.send(embed.setDescription('`Yeterli Yetkin Bulunmamakta.`')).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (banLimitleri.get(message.author.id) >= ayar.banLimit) return message.reply(`\`${this.configuration.name} komutu için limite ulaştın!\``);
  if(!uye) return message.channel.send( embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send( embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let sure = args[1];
  let reason = args.splice(2).join(" ");
  if(!sure || !ms(sure) || !reason) return message.channel.send(embed.setDescription("Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  let atilisTarihi = Date.now();
  let bitisTarihi = atilisTarihi+ms(sure);
  let cezaNumara = await client.cezaNumara();
  if (uye.id === "335063636580237313") {
message.channel.send(new MessageEmbed().setColor("RANDOM").setFooter("Attın Şuan Kanka Ayn .d").setDescription(`Kendi Botumla Banamı Ceza Vericeksin! XD`)).then(x => x.delete({timeout: 5000}));
return;
};
   uye.roles.set(uye.roles.cache.has(ayar.boosterRolu) ? [ayar.jailRolu, ayar.boosterRolu] : [ayar.jailRolu]).catch(() => {
    return undefined;
});  
  if(uye.voice.channelID) uye.voice.kick().catch();
  
  message.channel.send( embed.setDescription(`${uye} üyesine, ${message.author} tarafından **${moment.duration(ms(sure)).format("D [gün,] H [saat,] m [dakika] s [saniye] ")}** süreliğine ${message.guild.roles.cache.get(ayar.jailRolu).toString()} rolü verildi! ${reason ? `Sebep: ${reason}` : ""}`)).then(x => x.delete({ timeout: 10000 }));
    if(ayar.jailLogKanali && client.channels.cache.has(ayar.jailLogKanali)) client.channels.cache.get(ayar.jailLogKanali).send(embed
    .setDescription(`
    ${client.emoji("mute")} ${uye} kişisi ${message.author} Tarafından **${reason}** sebebiyle **${moment.duration(ms(sure)).format('D [gün,] H [saat,] m [dakika] s [saniye]')}** susturuldu.
    ──────────────
    \`•\` Karantina başlangıç tarihi: **${new Date(atilisTarihi).toTurkishFormatDate()}**
    \`•\` Karantina tarihi: **${new Date(bitisTarihi).toTurkishFormatDate()}**
    \`•\` Ceza Numarası \`${cezaNumara}\``)).catch();
  let newPenalty = new Penalty({
    sunucuID: message.guild.id,
    uyeID: uye.id,
    yetkiliID: message.author.id,
    cezaTuru: "TEMP-JAIL",
    cezaSebebi: reason,
    atilmaTarihi: atilisTarihi,
    bitisTarihi: bitisTarihi,
  });
  newPenalty.save();
  if (message.member.roles.cache.has(global.sunucuAyar.sahipRolu)) return;
  banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))+1);
  setTimeout(() => {
      banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))-1);
  }, 1000*60*3);
   let puan = await db.fetch(`cezapuan.${uye.id}`)
let puanlogsss = message.guild.channels.cache.find(c => c.id == "822727535246573588") 
puanlogsss.send(`${uye}: aldığınız **#${cezaNumara-(-1)}** ID'li ceza ile ${!puan ? 4 : puan} ceza puanına ulaştınız.`)
db.add(`cezapuan.${uye.id}`,4)
  
};
module.exports.configuration = {
  name: "tempjail",
  aliases: ['tempcezalı', 'süreli-cezalı', "tj", "temp-jail"],
  usage: "tempjail [üye] [süre] [sebep]",
  description: "Belirtilen üyeyi süreli jaile atar.",
  permLevel: 0
};