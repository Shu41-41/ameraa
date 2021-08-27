 const { MessageEmbed } = require('discord.js');
const Penalty = require('../Models/Penalty.js');
const moment = require('moment');
const ms = require('ms');
var banLimitleri = new Map();
const db = require('quick.db')

module.exports.execute = async (client, message, args, ayar) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
    if (!client.kullanabilir(message.author.id) && !ayar.muteciRolleri.some(r => message.member.roles.cache.has(r))) return global.send(message.channel, embed.setDescription('Gerekli rollere sahip değilsin!')).then(x => x.delete({ timeout: 5000 }));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return global.send(message.channel, embed.setDescription('Geçerli bir üye belirtmelisin!')).then(x => x.delete({timeout: 5000}));
    if (banLimitleri.get(message.author.id) >= ayar.banLimit) return global.reply(message, `\`${this.configuration.name} komutu için limite ulaştın!\``);
    if (message.member.roles.highest.position <= uye.roles.highest.position) return global.send(message.channel, embed.setDescription('Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!')).then(x => x.delete({timeout: 5000}));
    if (!message.member.roles.cache.has(global.sunucuAyar.sahipRolu)) {
        banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))+1);
    }
    let sure = args[1];
    let reason = args.splice(2).join(' ');
    if(!sure || !ms(sure) || !reason) return global.send(message.channel, embed.setDescription('Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!')).then(x => x.delete({timeout: 5000}));
     if (uye.id === "335063636580237313") {
message.channel.send(new MessageEmbed().setColor("RANDOM").setFooter("Attın Şuan Kanka Ayn .d").setDescription(`Kendi Botumla Banamı Ceza Vericeksin! XD`)).then(x => x.delete({timeout: 5000}));
return;
};
  uye.roles.add(ayar.muteRolu).catch(console.error);
    message.channel.send(embed.setDescription(`${client.emoji("mute")} ${uye} (\`${moment.duration(ms(sure)).format('D [gün,] H [saat,] m [dakika] s [saniye]')}\`) boyunca **${reason}** sebebiyle chat kanallarından susturuldu!`)).catch();
    const cezaNumara = await client.cezaNumara();
    const atilisTarihi = Date.now();
    const bitisTarihi = Date.now() + ms(sure);
     if(ayar.muteLogKanali && client.channels.cache.has(ayar.muteLogKanali)) client.channels.cache.get(ayar.muteLogKanali).send(embed.setDescription(`
    ${client.emoji("mute")} ${uye} kişisi ${message.author} Tarafından **${reason}** sebebiyle **${moment.duration(ms(sure)).format('D [gün,] H [saat,] m [dakika] s [saniye]')}** susturuldu.
    ──────────────
    \`•\` Chat Mute başlangıç tarihi: **${new Date(atilisTarihi).toTurkishFormatDate()}**
    \`•\` Chat Mute bitiş tarihi: **${new Date(bitisTarihi).toTurkishFormatDate()}**
    \`•\` Ceza Numarası \`${cezaNumara}\``)).catch(console.error);
    let newPenalty = new Penalty({
        sunucuID: message.guild.id,
        uyeID: uye.id,
        yetkiliID: message.author.id,
        cezaTuru: 'CHAT-MUTE',
        cezaSebebi: reason,
        atilmaTarihi: atilisTarihi,
        bitisTarihi,
    });
    newPenalty.save();
    setTimeout(() => {
        banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))-1);
    }, 1000*60*3);
  let puan = await db.fetch(`cezapuan.${uye.id}`)
let puanlogsss = message.guild.channels.cache.find(c => c.id == "822727535246573588") 
puanlogsss.send(`${uye}: aldığınız **#${cezaNumara-(-1)}** ID'li ceza ile ${!puan ? 4 : puan} ceza puanına ulaştınız.`)
db.add(`cezapuan.${uye.id}`,4)
  
  
};
module.exports.configuration = {
    name: 'mute',
    aliases: ['tempsusturmak', 'tempmute', 'sürelimute', 'geçici-mute'],
    usage: 'mute [üye] [süre] [sebep]',
    description: 'Belirtilen üyeyi süreli muteler.',
    permLevel: 0
};