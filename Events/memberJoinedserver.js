const { MessageEmbed }= require("discord.js");
const Penalty = require('../Models/Penalty.js');
require("moment-duration-format")
const moment = require('moment');
module.exports = async member => {
  let client = global.client;
  let ayarlar = global.sunucuAyar;
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let cezalar = await Penalty.find({ sunucuID: member.guild.id, uyeID: member.id });

  if (cezalar.filter(d => (!d.bitisTarihi || d.bitisTarihi > Date.now()) && (d.cezaTuru === "JAIL" || d.cezaTuru === "TEMP-JAIL")).length) {
    member.roles.set([ayarlar.jailRolu]);
  } else if (ayarlar.yasakTaglar.length && ayarlar.yasakTaglar.some(tag => member.user.username.includes(tag))) {
    member.roles.set([ayarlar.yasakTagRolu]);
    member.send(`Merhaba, **${client.guilds.cache.get(ayarlar.sunucuID).name}** sunucusunun yasaklı tag listesinde bulunan bir tagı kullanmaktasınız. Bundan dolayı **${client.guilds.cache.get(ayarlar.sunucuAyar.sunucuID).name}** sunucusundaki kanallara erişiminiz yasaklandı ve yasaklı tag bölümü hariç hiçbir odayı göremeyeceksiniz. Eğer **${client.guilds.cache.get(ayarlar.sunucuAyar.sunucuID).name}** sunucusunda normal bir üye gibi her odaya giriş hakkını ve yazı yazma hakkını tekrardan geri kazanmak istiyorsanız tagınızı isminizden çıkartabilirsiniz.\n-**${client.guilds.cache.get(ayarlar.sunucuAyar.sunucuID).name}** sunucusunun tagını alarak sunucudaki çoğu özelliklerden yararlanabilirsiniz.\nSunucu Tagı: ${ayarlar.tag}`).catch(() => {
      return undefined;
  });
  } else if (guvenilirlik) {
    member.roles.set([ayarlar.fakeHesapRolu]);
    if(ayarlar.jailLogKanali && member.guild.channels.cache.has(ayarlar.jailLogKanali)) return member.guild.channels.cache.get(ayarlar.teyitKanali).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic: true})).setDescription(`${member} üyesi sunucuya katıldı fakat hesabı ${member.client.tarihHesapla(member.user.createdAt)} açıldığı için jaile atıldı!`).setTimestamp().setFooter(ayarlar.durum));
  } else {
    member.setNickname(`${ayarlar.ikinciTag} İsim | Yaş`);
    if (ayarlar.teyitsizRolleri.length) member.roles.add(ayarlar.teyitsizRolleri);
   if(ayarlar.teyitKanali && member.guild.channels.cache.has(ayarlar.teyitKanali)) member.guild.channels.cache.get(ayarlar.teyitKanali).send(`
 
${client.emoji("gif1")}  Miroslava Sunucusuna Hoş Geldin! 

${client.emoji("gif2")}  ${member} (\`${member.user.id}\`), hesabın  \`${moment(member.user.createdAt).format('DD/MM/YYYY | HH:mm:ss')}\` tarihinde ${member.client.tarihHesapla(member.user.createdAt)} oluşturulmuş! :tada:

${client.emoji("gif3")}  Seninle birlikte  ${client.emojiSayi(`${member.guild.memberCount}`)} kişi olduk! <@&> rolüne sahip yetkililer senin ile ilgilenecektir.

${client.emoji("gif4")}  Sunucu kurallarımız <#814269731153510420> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza-i işlemler kuralları okuduğunu varsayarak gerçekleştirilecek.

${client.emoji("gif5")}  Tagımıza ulaşmak için herhangi bir kanala \`.tag\` yazman yeterlidir. Şimdiden iyi eğlenceler! :tada: :tada: :tada:

`); 
        
  };
};
module.exports.configuration = {
  name: "guildMemberAdd"
};