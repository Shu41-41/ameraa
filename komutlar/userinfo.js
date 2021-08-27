var moment = require("moment");
const { MessageEmbed } = require('discord.js');
const { prefix } = global.conf;

module.exports.execute = async (client, message, args, ayar, emoji) => {
var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0])||message.guild.members.cache.get(message.author.id))
  
    
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js")
  let Olusturma = moment(user.user.createdAt).add(3, "h").format("DD.MM.YYYY")
  let Katılma = moment(message.guild.members.cache.get(user.id).joinedAt).add(3, "h").format("DD.MM.YYYY  ")
  var x = moment(user.user.createdAt).add(3, "h").fromNow();
  var x = x
.replace(/önce/g, "Önce")
.replace(/ay/g, "Ay")
.replace(/yıl/g, "Yıl")
.replace(/bir/g, "1")


//.setAuthor(message.author.tag ,message.author.avatarURL())



          let embed = new MessageEmbed()
    .setColor('#880707')
    .setAuthor('User Info', `${message.author.tag ,message.author.avatarURL()}`)
      .setThumbnail(user.user.avatarURL())
    .setDescription(`

**• Kullanıcı Adı :** ${user.user.tag}

**• ID :**  ${user.id}

**• Olışturma Tarihi :** ${Olusturma} ( **${x}** )

**• Sunucuya Katılma Tarihi :** ${Katılma}
`)
    .setFooter(ayar.durum)
    
    .setTimestamp()
     message.channel.send(embed).then(x => x.delete({ timeout: 10000 }));


}

module.exports.configuration = {
  name: "userinfo",
  aliases: ["userinfo"],
  usage: "userinfo",
  description: "Belirtilen üyeyi jailden çıkarır.",
  permLevel: 0
};