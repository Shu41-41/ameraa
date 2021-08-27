const { MessageEmbed } = require('discord.js');
const moment = require("moment");

module.exports.execute = async (client, message, args, conf) => {
   /* let enAltYetkiliRolu = message.guild.roles.cache.get(global.sunucuAyar.enAltYetkiliRolu);
    const authorizeds = message.guild.members.cache.filter(member => member.roles.highest.position >= enAltYetkiliRolu.position);

    switch (args[0]) {
        case "sıfırla": {
          global.reply(message, `**${message.guild.members.cache.filter(x => x.roles.cache.has(global.sunucuAyar.katildiRolu) || x.roles.cache.has(global.sunucuAyar.katilmadiRolu)).size}** kişiden rol alınacak.`);
          message.guild.members.cache.filter(x => x.roles.cache.has(global.sunucuAyar.katildiRolu) || x.roles.cache.has(global.sunucuAyar.katilmadiRolu)).forEach(x => x.roles.remove([global.sunucuAyar.katildiRolu, global.sunucuAyar.katilmadiRolu]).catch(err => global.reply(message, `${x} üyesinden rol alınamadı!`)));
          global.reply(message, "üyelerden katıldı rolü alındı, bazılarından alınmamış olabilir");
          break;
        }
        case "katıldı": {
          let log = message.guild.channels.cache.get(global.sunucuAyar.toplantiLogKanali);
          let channel = message.guild.channels.cache.get(args[1]);
          if (!channel || channel.type != "voice") return global.reply(message, "böyle bir kanal bulunamadı veya bu kanal ses kanalı değil!");
      
          channel.members.filter(x => x.id != message.author.id && !x.user.bot).forEach(x => x.roles.add(global.sunucuAyar.katildiRolu).catch(err => global.reply(message, `${x} üyesine rol verilemedi!`)));
    
          let katılmayanŞerefsizler = message.guild.members.cache.filter(x => !x.user.bot && !x.voice.channelID && !x.roles.cache.has(global.sunucuAyar.katildiRolu) && authorizeds.some(c => c.id == x.id));
          katılmayanŞerefsizler.forEach(x => x.roles.add(global.sunucuAyar.katilmadiRolu).catch(err => global.reply(message, `${x} üyesine toplantı katılmadı rolü verilemedi`)));
    
          global.send(message.channel, `**${channel.name}** odasındaki **${channel.members.size}** adet üyeye toplantı rolü verildi ve loglandı!`);
          global.send(log, `@everyone \n**${moment(Date.now()).tz("Europe/Istanbul").format("YYYY.MM.DD | HH:mm:ss")}** tarihinde ${message.author} tarafından **${channel.name}** odasındaki **${channel.members.size}** adet üyeye toplantıya katıldı rolü verildi! Katılan üyeler;\n\`\`\`xl\n${channel.members.map(x => x.displayName + " / " + x.id).join("\n")}\`\`\``, { split: true });
          global.send(log, `__**toplantıya katılmayan şerefsizler;**\n__\`\`\`xl\n${katılmayanŞerefsizler.map(x => x.displayName + " / " + x.id).join("\n")}\n\`\`\``)
          break;
        }
      }*/
    const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor()).setTimestamp();
    if(!message.member.voice || message.member.voice.channelID != conf.toplantiSesKanali) return;
    const verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(conf.katildiRolu) && !member.user.bot);
    const members = message.guild.members.cache.filter(member => member.roles.cache.has(conf.katildiRolu) && member.voice.channelID != conf.toplantiSesKanali);
    members.array().forEach((member, index) => {
        setTimeout(() => {
            member.roles.remove(conf.katildiRolu).catch(() => {
                return undefined;
            });
        }, index * 200);
    });
    verildi.array().forEach((member, index) => {
        setTimeout(() => {
            member.roles.add(conf.katildiRolu).catch(() => {
                return undefined;
            });
        }, index * 200);
    });
   message.channeld.send(embed.setTitle("**Yoklama**").setDescription(`\`Katıldı Rolü Verilen Üyeler\` : ${verildi.map(member => `${member}`).join(", ")}`))
     message.channeld.send(embed.setTitle("**Yoklama**").setDescription(`\`Katıldısı Alınan Üyeler\` : ${members.map(member => `${member}`).join(", ")}`))
     message.channeld.send(embed.setDescription(`Katıldı rolü dağıtılmaya başlandı! \n\n🟢 **Rol Verilecek:** ${verildi.size} \n🔴 **Rol Alınacak:** ${members.size}`)).catch(() => {
        return undefined;
    });
};
module.exports.configuration = {
    name: 'yoklama',
    aliases: ["katıldı"],
    usage: 'yoklama',
    description: 'Katıldı rolü dağıtır.',
    permLevel: 1
};