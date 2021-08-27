const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');

module.exports.execute = async(client, message, args, ayar, emoji) => {
  let guild = message.guild;
	if(args[0] === "kur" || args[0] === "kurulum") {
    if(!conf.sahip.some(x => message.author.id == x) && !message.member.roles.cache.has(ayar.sahipRolu)) return;
    let onay1 = "https://cdn.discordapp.com/emojis/759905732577198081.gif?v=1";
    let onay2 = "https://cdn.discordapp.com/emojis/804398280351547453.gif?v=1";
    let iptal = "https://cdn.discordapp.com/emojis/768678367079170048.gif?v=1";
    let bosta = "https://cdn.discordapp.com/emojis/673576453140512788.png?v=1";
    let rahatsizetmeyin = "https://cdn.discordapp.com/emojis/673576231433797664.png?v=1";
    let gorunmez = "https://cdn.discordapp.com/emojis/673576417224556611.png?v=1";
    let cevrimici = "https://cdn.discordapp.com/emojis/673576292205068314.png?v=1";
    let erkek = "https://cdn.discordapp.com/emojis/819130604573687808.gif?v=1";
    let kadın = "https://cdn.discordapp.com/emojis/819130577705500684.gif?v=1";
    let gerisayım = "https://cdn.discordapp.com/emojis/761662142784208956.gif?v=1";
    let melo_sesmute = "https://cdn.discordapp.com/emojis/823577253807390750.png?v=1";
    let melo_ban = "https://cdn.discordapp.com/emojis/823577253802803271.png?v=1";

    let say1 = "https://cdn.discordapp.com/emojis/759904918227648532.gif?v=1";
    let say2 = "https://cdn.discordapp.com/emojis/759904921570377779.gif?v=1";
    let say3 = "https://cdn.discordapp.com/emojis/759904921888882698.gif?v=1";
    let say4 = "https://cdn.discordapp.com/emojis/759904919603118121.gif?v=1";
    let say5 = "https://cdn.discordapp.com/emojis/759904920173412432.gif?v=1";
    let say6 = "https://cdn.discordapp.com/emojis/759904921834881074.gif?v=1";
    let say7 = "https://cdn.discordapp.com/emojis/759904921033375816.gif?v=1";
    let say8 = "https://cdn.discordapp.com/emojis/759904922266238987.gif?v=1";
    let say9 = "https://cdn.discordapp.com/emojis/759904921758990337.gif?v=1";
    let say0 = "https://cdn.discordapp.com/emojis/759904917699428352.gif?v=1";

    let meloparıltı = "https://cdn.discordapp.com/emojis/817338708592033793.gif?v=1";
    let kaykay = "https://cdn.discordapp.com/emojis/805837505291092028.gif?v=1";
    let kopke = "https://cdn.discordapp.com/emojis/805837504611614751.gif?v=1";
    let sevimli = "https://cdn.discordapp.com/emojis/818081924114939934.png?v=1";
    let parıltı2 = "https://cdn.discordapp.com/emojis/817339013459214338.gif?v=1";
    let yildiz1 = "https://cdn.discordapp.com/emojis/817338653596057620.gif?v=1";

    guild.emojis.create(onay1, "melo_onay2").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onay2, "melo_onay2").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(iptal, "melo_iptal").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(bosta, "melo_bosta").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(rahatsizetmeyin, "melo_rahatsızetmeyin").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(gorunmez, "melo_gorunmez").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(cevrimici, "melo_cevrimici").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(erkek, "melo_erkek").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(kadın, "melo_kadin").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(gerisayım, "melo_gerisayım").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);

    guild.emojis.create(say1, "melo_say1").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say2, "melo_say2").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say3, "melo_say3").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say4, "melo_say4").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say5, "melo_say5").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say6, "melo_say6").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say7, "melo_say7").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say8, "melo_say8").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say9, "melo_say9").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(say0, "melo_say0").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);

    guild.emojis.create(meloparıltı, "melo_parilti").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(kaykay, "melo_kaykay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(kopke, "melo_kopke").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(sevimli, "melo_sevimli").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(parıltı2, "melo_parıltı2").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(yildiz1, "melo_yildiz1").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(melo_sesmute, "melo_sesmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(melo_ban, "melo_ban").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);

    return;
  };
  
  if(args[0] === "oluştur" || args[0] === "ekle") {
    if(!conf.sahip.some(x => message.author.id == x) && !message.member.roles.cache.has(ayar.sahipRolu)) return;
    let [link, ad] = args.slice(1).join(" ").split(" ");
    if (!link) return message.channel.send(`Bir link yazmalısın. Doğru kullanım: **${this.configuration.name} oluştur <link> <isim>**`);
    if (!ad) return message.channel.send(`Bir isim yazmalısın. Doğru kullanım: **${this.configuration.name} oluştur <link> <isim>**`);
  
    guild.emojis.create(link, ad)
      .then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`))
      .catch(console.error);
    return;
  };
  
  if(args[0] === "sil" || args[0] === "kaldır") {
    if(!conf.sahip.some(x => message.author.id == x) && !message.member.roles.cache.has(ayar.sahipRolu)) return;
    let guild = message.guild;
    let link = args[1];
    if (!link) return message.channel.send(`Silinecek emojinin adını veya ID'sini yazmalısın. \`${this.configuration.name} sil emoji\``);
    let emojisim = guild.emojis.cache.find(e => e.name === link);
    if (!emojisim) return message.channel.send(`\`${link}\` adında emoji bulunamadı.`);
    
    guild.deleteEmoji(emojisim.id || emojisim)
      .then(emoji => message.channel.send(`\`${emojisim.name}\` adlı emoji silindi.`))
      .catch(console.error);
    return;
  };
  
  if(args[0] === "id") {
    try {
      message.channel.send(`Sunucuda Bulunan Emojiler (${message.guild.emojis.cache.size} adet) \n\n${message.guild.emojis.cache.map(emoji => emoji.id + " | " + emoji.toString()).join('\n')}`, {code: 'xl', split: true})
    } catch (err) { };
    return
  };
  
  if (message.guild.emojis.cache.some(x => `${x.name}`.includes(args[0]))) {
    if (!message.guild.emojis.cache.some(x => `${x.name}`.includes(args[0]))) return message.channel.send(`Sunucuda  \`${args[0]}\`  adında bir emoji bulunamadı!`);
    const emoji = new MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(`**Emoji:**  ${message.guild.emojis.cache.find(a => a.name === args[0])} \n**Emoji Adı:**  ${message.guild.emojis.cache.find(a => a.name === args[0]).name} \n**Emoji ID'si:**  ${message.guild.emojis.cache.find(a => a.name === args[0]).id} \n**Emoji Kodu:**  \`${message.guild.emojis.cache.find(x => x.name == args[0]).toString()}\``);
    try {
      message.channel.send(emoji)
    } catch (err) {
      const embed = new MessageEmbed()
      .addField(`Sunucuda Bulunan Emojiler`, `Üzgünüm ama sunucuda ya çok fazla emoji bulunuyor ya da hiç emoji bulunmuyor. Bunları gösteremiyorum. Discord buna izin vermiyor.`)
      .setColor(0x00ffff)
      .setTimestamp()
      message.channel.send({embed})
    };
    return;
  };
  
  try {
    const embed = new MessageEmbed()
    .addField(`Sunucuda Bulunan Emojiler`, message.guild.emojis.cache.map(emoji => emoji).join(' | '))
    .setColor(0x00ffff)
    .setTimestamp()
    .setFooter('Emojileri IDleri ile birlikte görmek için; emojiler id')
    message.channel.send({embed})
  } catch (err) {
    const embed = new MessageEmbed()
    .addField(`Sunucuda Bulunan Emojiler`, `Üzgünüm ama sunucuda ya çok fazla emoji bulunuyor ya da hiç emoji bulunmuyor. Bunları gösteremiyorum. Discord buna izin vermiyor.`)
    .setFooter('Emojilere bakamıyor ve IDleri ile birlikte görmek isterseniz; emojiler id')
    .setColor(0x00ffff)
    .setTimestamp()
    message.channel.send({embed})
  };
};
module.exports.configuration = {
    name: "emojiler",
    aliases: ["emoji"],
    usage: "emojiler",
    description: "Sunucu emojileri."
};