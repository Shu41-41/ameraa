const { MessageEmbed }= require("discord.js");



module.exports = (oldState, newState) => {
  let client = global.client;
  let ayarlar = global.sunucuAyar;
  if (ayarlar.sesLogKanali && client.channels.cache.has(ayarlar.sesLogKanali)) {
    let logKanali = client.channels.cache.get(ayarlar.sesLogKanali);
    if (!oldState.channelID && newState.channelID) return global.send(logKanali,  new MessageEmbed().setAuthor("KULLANICI BİR KANALA GİRİŞ YAPTI").setDescription(`Giren Kullanıcı: ${newState.member} \`${newState.member.user.id}\`\n\`${newState.guild.channels.cache.get(newState.channelID).name}\` Adlı kanala giriş yapıldı\nSunucudaki İsmi: **${newState.member.displayName}**`).setTimestamp().setColor(client.randomColor())).catch();
    if (oldState.channelID && !newState.channelID) return global.send(logKanali,  new MessageEmbed().setAuthor("KULLANICI BİR KANALDAN ÇIKIŞ YAPTI").setDescription(`Çıkan Kullanıcı: ${newState.member} \`${newState.member.user.id}\`\n\`${oldState.guild.channels.cache.get(oldState.channelID).name}\` Adlı kanaladan çıkış yapıldı\nSunucudaki İsmi: **${newState.member.displayName}**\nÇıktığı Kanal: **${oldState.channel.name}**`).setTimestamp().setColor(client.randomColor())).catch();
    if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return global.send(logKanali,  new MessageEmbed().setAuthor("KULLANICI KANAL DEĞİŞTİRDİ").setDescription(`Kanal Değiştiren Kullanıcı: ${newState.member} \`${newState.member.user.id}\`\nSunucudaki İsmi: **${newState.member.displayName}\nÖnceki Kanal: **${oldState.channel.name}**\nŞimdiki Bulunduğu Kanal: **${newState.channel.name}**`).setTimestamp().setColor(client.randomColor())).catch();
    if (oldState.channelID && oldState.selfMute && !newState.selfMute) return global.send(logKanali,  new MessageEmbed().setDescription(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).setTimestamp().setColor(client.randomColor())).catch();
    if (oldState.channelID && !oldState.selfMute && newState.selfMute) return global.send(logKanali,  new MessageEmbed().setDescription(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).setTimestamp().setColor(client.randomColor())).catch();
    if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return global.send(logKanali,  new MessageEmbed().setDescription(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).setTimestamp().setColor(client.randomColor())).catch();
    if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return global.send(logKanali,  new MessageEmbed().setDescription(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).setTimestamp().setColor(client.randomColor())).catch();
  };
}

module.exports.configuration = {
  name: "voiceStateUpdate"
}