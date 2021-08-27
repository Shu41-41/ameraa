const { MessageEmbed } = require('discord.js');

const fs = require('fs');

const ayarlar = require('../sunucuAyar.js');


module.exports.execute = async (client, message, args, ayar, emoji) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return;

   let r = message.guild.members.cache.filter(m=>m._roles.length===0)

  

  r.forEach(async function(yetkilikisi){

    

    yetkilikisi.roles.add(ayarlar.kayıtsız)


    

  })

message.react('✅')

let embed = new MessageEmbed()
.setColor("#2F3136")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`${r.size} Kayıtsız Verildi`)
 message.channel.send(embed).then(x => x.delete({ timeout: 5000 }));


  

}

module.exports.configuration = {
  name: "ver",
  aliases: ["ver"],
  usage: "ver",
  description: "Belirtilen üyeyi jailden çıkarır.",
  permLevel: 0
};