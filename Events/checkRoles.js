const { MessageEmbed } = require("discord.js");
const Penalty = require('../Models/Penalty.js');
const client = global.client;

module.exports = () => {
  setInterval(async () => {
    await checkRoles();
  }, 20000);
};

module.exports.configuration = {
  name: "ready"
};

async function checkRoles() {
  let ayar = global.sunucuAyar;
  let guild = client.guilds.cache.get(ayar.sunucuID);
  let yasakTaglar = ayar.yasakTaglar;
  let ekipRol = guild.roles.cache.get(ayar.ekipRolu);


  guild.roles.cache.get(ayar.ekipRolu).members.filter(u => !u.user.username.includes(ayar.tag) && !u.hasPermission("MANAGE_GUILD") && !u.hasPermission("ADMINISTRATOR") && !u.user.bot).array().forEach((u, index) => {
      if (u.user.username.includes(ayar.tag)) return;
      if (u.nickname && u.displayName.includes(ayar.tag))
      u.setNickname(u.displayName.replace(ayar.tag, ayar.ikinciTag)).catch(); 
     u.roles.remove(u.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch();
      u.roles.remove(ayar.ekipRolu).catch();
  });

 //  guild.members.cache.filter(u => !u.user.bot && !u.roles.cache.has(ayar.jailRolu) && !u.roles.cache.has(ayar.boosterRolu)  && !u.hasPermission("ADMINISTRATOR")  && !ayar.vipRole.some(x => u.roles.cache.has(x))  && !u.roles.cache.has(ayar.yasakTagRolu) && !ayar.teyitsizRolleri.some(r => u.roles.cache.has(r)) && !u.user.username.includes(ayar.tag)).array().forEach((u, index) => {
    //  if (u.user.username.includes(ayar.tag)) return;
  ///    u.roles.set(ayar.teyitsizRolleri);   
  // });
  
  guild.members.cache.filter(u => !u.user.bot && !u.roles.cache.has(ayar.jailRolu) && !u.roles.cache.has(ayar.fakeHesapRolu) && !u.hasPermission("MANAGE_GUILD") && !u.hasPermission("ADMINISTRATOR") && !u.roles.cache.has(ayar.yasakTagRolu) && !ayar.teyitsizRolleri.some(r => u.roles.cache.has(r)) && u.user.username.includes(ayar.tag) && (!u.roles.cache.has(ayar.ekipRolu) || !u.displayName.includes(ayar.tag))).array().forEach((u, index) => {
    if (!u.user.username.includes(ayar.tag)) return;
    if (u.nickname && !u.displayName.includes(ayar.tag)) 
    u.setNickname(u.displayName.replace(ayar.ikinciTag, ayar.tag)).catch(() => { return undefined; }).catch();
    if (!u.roles.cache.has(ayar.ekipRolu))
      u.roles.add(ayar.ekipRolu).catch(); 
  });

   // Yasak tagı olanlara yasak tag rolü verme
  guild.members.cache.filter(uye => yasakTaglar.some(tag => uye.user.username.includes(tag)) && !uye.roles.cache.has(ayar.vipRole) && !uye.roles.cache.has(ayar.yasakTagRolu) && !ayar.vipRole.some(x => uye.roles.cache.has(x)) && !uye.roles.cache.has(ayar.boosterRolu)).array().forEach((uye, index) => {
      uye.roles.set([ayar.yasakTagRolu]).catch();
      uye.send(`Merhaba, ${guild.name} sunucusunun yasaklı tag listesinde bulunan bir tagı kullanmaktasınız. Bundan dolayı ${guild.name} sunucusundaki kanallara erişiminiz yasaklandı ve yasaklı tag bölümü hariç hiçbir odayı göremeyeceksiniz. Eğer ${guild.name} sunucusunda normal bir üye gibi her odaya giriş hakkını ve yazı yazma hakkını tekrardan geri kazanmak istiyorsanız tagınızı isminizden çıkartabilirsiniz.\n-${client.guilds.cache.get(ayar.sunucuID).name} sunucusunun tagını alarak sunucudaki çoğu özelliklerden yararlanabilirsiniz.\nSunucu Tagı: ${ayar.tag}`).catch();
  });

  // Yasak tagı olmayıp yasak tag rolü olan üyelerden rolü alma
  guild.members.cache.filter(uye => !yasakTaglar.some(tag => uye.user.username.includes(tag)) && uye.roles.cache.has(ayar.yasakTagRolu)).array().forEach((uye, index) => {
      uye.roles.set(ayar.teyitsizRolleri).catch();
  });
  let Penalties = await Penalty.find({ sunucuID: guild.id });
  Penalties = Penalties.filter(p => guild.members.cache.has(p.uyeID) && p.cezaTuru !== "BAN" && p.cezaTuru !== "KICK");
  let bitmisCezalar = Penalties.filter(p => p.bitisTarihi && p.bitisTarihi < Date.now());
  let surenCezalar = Penalties.filter(p => !p.bitisTarihi || p.bitisTarihi > Date.now());
  for (let i = 0; i < surenCezalar.length; i++) {
    let surenCeza = surenCezalar[i];
    if (!surenCeza) return;
    let uye = guild.members.cache.get(surenCeza.uyeID);
    if ((surenCeza.cezaTuru === "JAIL" || surenCeza.cezaTuru === "TEMP-JAIL") && !uye.roles.cache.has(ayar.jailRolu)) {
      //setTimeout(() => {
        if (!uye.roles.cache.has(ayar.jailRolu)) uye.roles.set(uye.roles.cache.has(ayar.boosterRolu) ? [ayar.boosterRolu, ayar.jailRolu] : [ayar.jailRolu]).catch(() => {
          return undefined;
      });  
      //}, i*2000);
    };
    if (surenCeza.cezaTuru === "CHAT-MUTE" && !uye.roles.cache.has(ayar.muteRolu)) {
      //setTimeout(() => {
        if (!uye.roles.cache.has(ayar.muteRolu)) uye.roles.add(ayar.muteRolu).catch(() => {
          return undefined;
      });  
      //}, i*2000);
    };
    if (surenCeza.cezaTuru === "VOICE-MUTE" && uye.voice.channelID && !uye.voice.serverMute) {
      //setTimeout(() => {
        if (uye.voice.channelID && !uye.voice.serverMute) uye.voice.setMute(true).catch(() => {
          return undefined;
      });  
      //}, i*2000);
    };
  };
  for (let i = 0; i < bitmisCezalar.length; i++) {
    let bitmisCeza = bitmisCezalar[i];
    if (!bitmisCeza) return;
    let uye = guild.members.cache.get(bitmisCeza.uyeID);
    let surenJail = surenCezalar.filter(c => c.uyeID === bitmisCeza.uyeID && (c.cezaTuru === "JAIL" || c.cezaTuru === "TEMP-JAIL")).length;
    if ((bitmisCeza.cezaTuru === "JAIL" || bitmisCeza.cezaTuru === "TEMP-JAIL") && uye.roles.cache.has(ayar.jailRolu) && !surenJail) {
        if (uye.roles.cache.has(ayar.jailRolu))  uye.roles.set(uye.roles.cache.has(ayar.boosterRolu) ? ayar.teyitsizRolleri.concat(ayar.boosterRolu): ayar.teyitsizRolleri).catch().catch(() => {
          return undefined;
      });  

    };
    let surenChatMute = surenCezalar.filter(c => c.uyeID === bitmisCeza.uyeID && c.cezaTuru === "CHAT-MUTE").length;
    if (bitmisCeza.cezaTuru === "CHAT-MUTE" && uye.roles.cache.has(ayar.muteRolu) && !surenChatMute) {
        if (uye.roles.cache.has(ayar.muteRolu)) uye.roles.remove(ayar.muteRolu).catch(() => {
          return undefined;
      });  
    };
    let surenVoiceMute = surenCezalar.filter(c => c.uyeID === bitmisCeza.uyeID && c.cezaTuru === "VOICE-MUTE").length;
    if (bitmisCeza.cezaTuru === "VOICE-MUTE" && uye.voice.channelID && uye.voice.serverMute && !surenVoiceMute) {
        if (uye.voice.channelID && uye.voice.serverMute) uye.voice.setMute(false).catch(() => {
          return undefined;
      });  
    };
  };
};