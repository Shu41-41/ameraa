const { MessageEmbed } = require("discord.js");
const Penalty = require('../Models/Penalty.js');
var banLimitleri = new Map();

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
  if(!client.kullanabilir(message.author.id) && !ayar.banciRolleri.some(r => message.member.roles.cache.has(r))) return message.channel.send(embed.setDescription('Bu komutu kullanabilmek için gerekli rollere sahip değilsin!')).then(x => x.delete({timeout: 5000}));

  if(args[0] && args[0].includes('list')) {
    message.guild.fetchBans().then(bans => {
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** ${user.tag} (${user.id})\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
    });
    return;
  };
  
  if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))) {
    if(!args[1] || isNaN(args[1])) return message.channel.send(embed.setDescription(`Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin!`)).then(x => x.delete({timeout: 5000}));;
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** ${user.tag} (${user.id})\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
  };
  let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (banLimitleri.get(message.author.id) >= ayar.banLimit) return message.reply(`\`${this.configuration.name} komutu için limite ulaştın!\``);
  if (!reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000})).then(x => x.delete({timeout: 5000}));
  let cezaNumara = await client.cezaNumara();
  if (!victim) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      if (!message.member.roles.cache.has(global.sunucuAyar.sahipRolu)) {
        banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))+1);
      }
      let newPenalty = new Penalty({
        sunucuID: message.guild.id,
        uyeID: kisi.id,
        yetkiliID: message.author.id,
        cezaTuru: "BAN",
        cezaSebebi: reason,
        atilmaTarihi: Date.now(),
        bitisTarihi: null,
      });
      newPenalty.save();
      message.react(client.emojiler.onay).catch();
  if(ayar.banLogKanali && client.channels.cache.has(ayar.banLogKanali)) client.channels.cache.get(ayar.banLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setTimestamp().setFooter(ayar.durum).setDescription(`** • ${victim},${message.author} tarafından ${reason} nedeniyle sunucudan yasaklandı!\nCeza ID:** #${cezaNumara} \n• Yasaklanma Tarihi: ${new Date().toTurkishFormatDate()}`));
    } else {
      message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    };
    setTimeout(() => {
      banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))-1);
    }, 1000*60*3);
  };

  if(victim.roles && message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send(embed.setDescription("Banlamaya çalıştığın üye senle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 5000}));
  if(!victim.bannable) return message.channel.send(embed.setDescription("Botun yetkisi belirtilen üyeyi banlamaya yetmiyor!")).then(x => x.delete({timeout: 5000}));
  if (victim.id === "335063636580237313") {
message.channel.send(new MessageEmbed().setColor("RANDOM").setFooter("Attın Şuan Kanka Ayn .d").setDescription(`Kendi Botumla Banamı Ceza Vericeksin! XD`)).then(x => x.delete({timeout: 5000}));
return;
};
  
  victim.send(embed.setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan banlandın.`)).catch();
  victim.ban({reason: reason}).then(x => message.react(client.emojiler.onay)).catch();
  banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))+1);
  setTimeout(() => {
    banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))-1);
  }, 1000*60*3);
  let newPenalty = new Penalty({
    sunucuID: message.guild.id,
    uyeID: victim.id,
    yetkiliID: message.author.id,
    cezaTuru: "BAN",
    cezaSebebi: reason,
    atilmaTarihi: Date.now(),
    bitisTarihi: null,
  });
  message.channel.send(embed.setImage(`https://cdn.discordapp.com/attachments/707934190016004209/708302696251392000/giphy-1.gif`).setDescription(`${client.emoji("ban")} \`${victim.user.tag}\` üyesi ${message.author} tarafından **${reason}** nedeniyle **banlandı!**`)).then(x => x.delete({ timeout: 10000 }));

  if(ayar.banLogKanali && client.channels.cache.has(ayar.banLogKanali)) client.channels.cache.get(ayar.banLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setTimestamp().setFooter(ayar.durum).setDescription(`
  ${client.emoji("ban")} ${victim} (${victim.user.id}) üyesi sunucudan banlandı
  
  \`•\` Yasaklama Sebebi: ${reason}
  \`•\` Yasaklayan yetkili: ${message.author} (\`${message.author.id}\`)
  \`•\` Yasaklanma Tarihi: **${new Date().toTurkishFormatDate()}**
  \`•\` Ceza ID: \`#${cezaNumara}\``));
  
  
  
  newPenalty.save();

};
module.exports.configuration = {
  name: "ban",
  aliases: [],
  usage: "ban [üye] [sebep] / liste / bilgi [id]",
  description: "Belirtilen üyeyi sunucudan yasaklar.",
  permLevel: 0
};