const { MessageEmbed } = require('discord.js');
const Penalty = require('../Models/Penalty.js');
const moment = require('moment');
const ms = require('ms');
var banLimitleri = new Map();
const db = require('quick.db')

module.exports.execute = async (client, message, args, ayar) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
    if(!client.kullanabilir(message.author.id) && !ayar.sesMuteciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.channel.send( embed.setDescription('`Yeterli Yetkin Bulunmamakta.`')).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send( embed.setDescription('Geçerli bir üye belirtmelisin!')).then(x => x.delete({timeout: 5000}));
    if (banLimitleri.get(message.author.id) >= ayar.banLimit) return message.reply(message, `\`${this.configuration.name} komutu için limite ulaştın!\``);
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
    if (!message.member.roles.cache.has(global.sunucuAyar.sahipRolu)) {
        banLimitleri.set(message.author.id, (Number(banLimitleri.get(message.author.id) || 0))+1);
    }
    let sure = args[1];
    let reason = args.splice(2).join(' ');
    if (uye.id === "335063636580237313") {
message.channel.send(new MessageEmbed().setColor("RANDOM").setFooter("Attın Şuan Kanka Ayn .d").setDescription(`Kendi Botumla Banamı Ceza Vericeksin! XD`)).then(x => x.delete({timeout: 5000}));
return;
};
    if(!sure || !ms(sure) || !reason) return message.channel.send( embed.setDescription('Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!')).then(x => x.delete({timeout: 5000}));
    let atilisTarihi = Date.now();
    let bitisTarihi = atilisTarihi+ms(sure);
    let cezaNumara = await client.cezaNumara();
   message.channel.send(embed.setDescription(`${client.emoji("mute")} ${uye} üyesi, ${message.author} tarafından **${moment.duration(ms(sure)).format('D [gün,] H [saat,] m [dakika]')}** boyunca **${reason}** nedeniyle seste mutelendi!`)).catch();
  if(ayar.sesMuteLogKanali && client.channels.cache.has(ayar.sesMuteLogKanali)) client.channels.cache.get(ayar.sesMuteLogKanali).send(embed.setDescription(`${client.emoji("mute")} ${uye} üyesi, **${moment.duration(ms(sure)).format('D [gün,] H [saat,] m [dakika] s [saniye]')}** boyunca **ses** kanallarında susturuldu!\n\n• Ceza ID: \`#${cezaNumara}\`\n• Susturulan Üye: ${uye} (\`${uye.user.tag}\` - \`${uye.id}\`)\n• Susturan Yetkili: ${message.author} (\`${message.author.tag}\` - \`${message.author.id}\`)\n• Susturulma Tarihi: \`${new Date(atilisTarihi).toTurkishFormatDate()}\`\n• Bitiş Tarihi: \`${new Date(bitisTarihi).toTurkishFormatDate()}\`\n• Susturulma Sebebi: \`${reason}\``)).catch(console.error);
    if(uye.voice.channelID) uye.voice.setMute(true).catch(console.error);
    let newPenalty = new Penalty({
        sunucuID: message.guild.id,
        uyeID: uye.id,
        yetkiliID: message.author.id,
        cezaTuru: 'VOICE-MUTE',
        cezaSebebi: reason,
        atilmaTarihi: atilisTarihi,
        bitisTarihi: bitisTarihi,
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
    name: 'sesmute',
    aliases: ['ses-mute', 'voice-mute', 'sestesustur','vmute'],
    usage: 'sesmute [üye] [süre] [sebep]',
    description: 'Belirtilen üyeyi seste belirtilen süre kadar muteler.',
    permLevel: 0
};