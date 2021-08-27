/* eslint-disable linebreak-style */
const { MessageEmbed } = require('discord.js');
const { prefix } = global.conf;

module.exports.execute = async (client, message, args, conf, emoji) => {

  let enAltYetkiliRolü = message.guild.roles.cache.get(conf.enAltYetkiliRolu); // en alttaki rol id
  let yetkililer = message.guild.members.cache.filter(uye => uye.roles.highest.position >= enAltYetkiliRolü.position);
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`
  \`•\` Toplam Yetkili Sayısı: ${yetkililer.size}
  \`•\` Aktif Yetkili Sayısı: ${yetkililer.filter(uye => uye.presence.status !== "offline").size}
  \`•\` Sesli Kanalda Bulunanlar: ${yetkililer.filter(uye => uye.voice.channel).size}
  \`•\` Sesli Kanalda Olmayan Yetkililer: ${yetkililer.filter(uye => !uye.voice.channel).size}  
  
  `)

  message.channel.send(embed);
};
module.exports.configuration = {
      name: 'ytsay',
    aliases: ["ytsay"],
    usage: 'ytsay [yetkili say]',
    description: 'Katıldı rolü dağıtır.',
    permLevel: 1
};