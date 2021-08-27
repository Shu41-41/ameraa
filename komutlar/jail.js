/* eslint-disable linebreak-style */
const { MessageEmbed } = require('discord.js');
const Penalty = require('../Models/Penalty.js');
var banLimitleri = new Map();
const db = require('quick.db')

module.exports.execute = async (client, message, args, ayar) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
    if(!client.kullanabilir(message.author.id) && !ayar.jailciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipyedek)) return message.channel.send(embed.setDescription('`Yeterli Yetkin Bulunmamakta.`')).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(' ');
  if (banLimitleri.get(message.author.id) >= ayar.banLimit) return message.reply(message, `\`${this.configuration.name} komutu için limite ulaştın!\``);
    if(!uye || !reason) return message.channel.send(embed.setDescription('Geçerli bir üye ve sebep belirtmelisin!')).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription('Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!')).then(x => x.delete({timeout: 5000}));

    let cezaNumara = await client.cezaNumara();
    if (uye.id === "335063636580237313") {
message.channel.send(new MessageEmbed().setColor("RANDOM").setFooter("Attın Şuan Kanka Ayn .d").setDescription(`Kendi Botumla Banamı Ceza Vericeksin! XD`)).then(x => x.delete({timeout: 5000}));
return;
};
  const staffPerms = uye.roles.highest.position >= message.guild.roles.cache.get(ayar.enAltYetkiliRolu).position ? uye.roles.cache.array() : null;
    await uye.roles.set(uye.roles.cache.has(ayar.boosterRolu) ? [ayar.jailRolu, ayar.boosterRolu] : [ayar.jailRolu]).catch(() => {
        return undefined;
    });
    if(uye.voice.channelID) uye.voice.kick().catch();
  
 message.channel.send(embed.setDescription(`${uye} üyesine, ${message.author} tarafından ${message.guild.roles.cache.get(ayar.jailRolu).toString()} rolü verildi!
 ${reason ? `Sebep: ${reason}` : ''}`)).then(x => x.delete({ timeout: 10000 }));
    client.channels.cache.get(ayar.jailLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setDescription(`
    ${uye} kişisi ${message.author} Tarafından **${reason}** sebebiyle **${message.guild.roles.cache.get(ayar.jailRolu).toString()}** Rolü Verildi
    ──────────────
    \`•\` Jail Atılma tarihi: **${new Date().toTurkishFormatDate()}**
    \`•\` Ceza Numarası \`${cezaNumara}\``));
    let newPenalty = new Penalty({
        sunucuID: message.guild.id,
        uyeID: uye.id,
        yetkiliID: message.author.id,
        cezaTuru: 'JAIL',
        cezaSebebi: reason,
        atilmaTarihi: Date.now(),
        bitisTarihi: null,
        yetkiler: staffPerms
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
    name: 'jail',
    aliases: ['cezalı', 'ceza'],
    usage: 'jail [üye] [sebep]',
    description: 'Belirtilen üyeyi jaile atar.',
};


