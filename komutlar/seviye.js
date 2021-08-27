const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const kdb = new qdb.table("kullanici");
const adb = new qdb.table("ayarlar");
const db = new qdb.table("level");

module.exports.onLoad = async (client) => {
    let sonMesaj = {};
    client.on("message", async message => {
      if (message.author.bot) return;
      if (message.content.length <= 6) return;
           if (sonMesaj[message.author.id])
      if ((Date.now() - sonMesaj[message.author.id]) / 1000 <= 2) return;
      let durum = Math.floor(Math.random() * 5);
      if (durum < 3) return;
      let xp = Math.floor(Math.random() * 5);
      let currentlyData = db.get("level.members." + message.author.id);
      if (!currentlyData) {
        db.set("level.members." + message.author.id, { Level: 0, XP: 0 });
        currentlyData = {
          Level: 0,
          XP: 0
        };
      }
      currentlyData.XP += xp;
      let nextLevel = getLevelExp(currentlyData.Level);
      if (nextLevel <= currentlyData.XP) {
        currentlyData.Level++;
        currentlyData.XP = 0;
      if(client.channels.cache.has("819564523979014144")) message.channel.send(client.channels.cache.get("819564523979014144").send(`${message.member}, **tebrikler!** Seviye atladın ve **${currentlyData.Level}. seviyeye** ulaştın. 🎉`))

       
      }
      db.set("level.members." + message.author.id, currentlyData);
      sonMesaj[message.author.id] = Date.now();
    });
}

module.exports.execute = async (client, message, args, ayar, emoji) => {
    let user = message.mentions.members.first() || message.member;
    if (!user) return;
    let data = db.get("level.members");
    if(!data)
      data = db.set("level.members", {});
    let udata = data[user.id];
    if (!udata){
      udata = db.set("level.members." + user.id, {
        Level: 0,
        XP: 0
      });
      udata = {
        Level: 0,
        XP: 0
      };
      data[user.id] = udata;
    }

    let sır = Object.keys(data);
    let sıralama = sır.sort((a, b) => (getLevelExp(data[b].Level) + data[b].XP) - (getLevelExp(data[a].Level) + data[a].XP)).indexOf(user.id) + 1;
    let embed = new MessageEmbed().setThumbnail(user.user.avatarURL({dynamic: true, size: 2048})).setAuthor(user.displayName, user.user.avatarURL({dynamic: true, size: 2048})).setFooter(ayar.durum).setColor(client.randomColor()).setTimestamp();
    message.channel.send(embed
   .setDescription(`:tada: Hey! • ${message.member} Level bilgileri aşşağı da belirtilmiştir!
  
   **Puan Bilgileri** 
   • Puanınız: \`${udata.XP || 0}\` Puan Seviyeniz: \`${udata.Level || 0}\`
  `));
  
};
module.exports.configuration = {
  name: "level",
  aliases: [],
  usage: "level [Level Göstergesi]",
  description: "Belirtilen üyeyin level/chat bilgisi."
};

function getLevelExp(level) {
  return 5 * Math.pow(level, 2) + 50 * level + 100;
}

function getLevelFromExp(exp) {
  let level = 0;

  while (exp >= getLevelExp(level)) {
    exp -= getLevelExp(level);
    level++;
  }

  return level;
}

function getLevelProgress(exp) {
  let level = 0;

  while (exp >= getLevelExp(level)) {
    exp -= getLevelExp(level);
    level++;
  }

  return exp;
}