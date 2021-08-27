


const { Client, MessageEmbed, Collection } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const mongoose = require('mongoose');
mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology: true});
const moment = require('moment');
const Penalty = require('./Models/Penalty.js');
require("moment-duration-format")
const db = require('quick.db');

require('moment-duration-format');
require('moment-timezone');
moment.locale('tr');
const MemberStats = require('./Models/MemberStats.js');
const fs = require("fs");
const conf = require("./ayarlar.json");
global.conf = conf; // guildMemberAdd, userUpdate gibi etkinliklerde işimiz kolaylaşsın.

const sunucuAyar = global.sunucuAyar = require("./sunucuAyar.js");

const sayiEmojiler = {
  0: "<a:melo_say0:822520037645746197>",
  1: "<a:melo_say1:822520046160314388>",
  2: "<a:melo_say2:822520049662951474>",
  3: "<a:melo_say3:822520046915682375>",
  4: "<a:melo_say4:822520050477039666>",
  5: "<a:melo_say5:822520047674982430>",
  6: "<a:melo_say6:822520048488808518>",
  7: "<a:melo_say7:822520045342818344>",
  8: "<a:melo_say8:822520035583066183>",
  9: "<a:melo_say9:822520044378259456>"

};

client.emojiler = {
  kiz: '822520026879885353',
  erkek: '822520030679924788',
  onay: '822520029131833355',
  iptal: '822520033565605940',
  cevrimici: '',
  rahatsizetmeyin: '',
  bosta: '',
  gorunmez: '',
  gif1: '822520043484348487',
  gif2: '822520039013744650',
  gif3: '822520041827467344',
  gif4: '822520042838818876',
  gif5: '822520029131833355',
  mute: '823577253807390750',
  ban: '823577253802803271'

};




client.renkrolleri = {
  color1: '775856851534610443',
  color2: '775856852533248010',
  color3: '776462640641081364',
  color4: '776462642863669258',
  color5: '776462643367378964',
  color6: '776462645019934730',
  color8: '776462645200158781',
  color7: '776462647683186718',

};
const commands = global.commands = new Collection();
const aliases = global.aliases = new Collection();
global.client = client;
fs.readdir("./komutlar", (err, files) => {
    if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(file => {
        let prop = require(`./komutlar/${file}`);
        if(!prop.configuration || !prop.configuration.name.length) return;
        if(typeof prop.onLoad === "function") prop.onLoad(client);
        commands.set(prop.configuration.name, prop);
        if(prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop.configuration.name));
    });
});
client.kullanabilir = function(id) {
  if (client.guilds.cache.get(sunucuAyar.sunucuID).members.cache.get(id).hasPermission("ADMINISTRATOR") || client.guilds.cache.get(sunucuAyar.sunucuID).members.cache.get(id).roles.cache.some(x => ["819564290020605983", "820003923175014440"].includes(x.id))) return true;
  return false;
};

fs.readdir("./Events", (err, files) => {
    if(err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`./Events/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.name, prop);
    });
});

client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};

client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
    yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};

global.emoji = client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};

client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

client.terapiler = {};

var CronJob = require('cron').CronJob;
var resetStats = new CronJob('00 00 00 * * 1', async function() {
  let guild = client.guilds.cache.get(sunucuAyar.sunucuID);
  let newData = new Map();
  await MemberStats.updateMany({ guildID: guild.id }, { voiceStats: newData, chatStats: newData });
  let stats = await MemberStats.find({ guildID: guild.id });
  stats.filter(s => !guild.members.cache.has(s.userID)).forEach(s => MemberStats.findByIdAndDelete(s._id));
  console.log('Haftalık istatistikler sıfırlandı!');
}, null, true, 'Europe/Istanbul');
resetStats.start();





client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase() === "tag" ||  msg.content.toLowerCase().startsWith("TAG") || msg.content.toLowerCase().startsWith("!tag") || msg.content.toLowerCase().startsWith(".tag"))    msg.channel.send(sunucuAyar.tag)
});

let beklemeSuresi = new Set();

client.on("message", (message) => {
  if(message.author.bot || !message.content.startsWith(conf.prefix) || message.channel.type == "dm") return;
  if (message.content.toLowerCase().startsWith('!ewqewqeqwewqewqewq') || message.content.toLowerCase().startsWith('.ewqewqeqwewqewqewq') || message.content.toLowerCase().startsWith('?ewqewqeqwewqewqewq')) {
    if (beklemeSuresi.has(message.author.id+1)) return;
    message.channel.send(sunucuAyar.tag);
    beklemeSuresi.add(message.author.id+1);
    setTimeout(() => { beklemeSuresi.delete(message.author.id+1); }, 15000);
    return;
  } else if (message.content.toLowerCase().startsWith('!link') || message.content.toLowerCase().startsWith('.link')) {
    if (beklemeSuresi.has(message.author.id+2)) return;
message.channel.send(sunucuAyar.davet);     beklemeSuresi.add(message.author.id+2);
    setTimeout(() => { beklemeSuresi.delete(message.author.id+2); }, 15000);
    return;
  }

  if(Object.keys(client.renkrolleri).some(x => message.content.toLowerCase().startsWith("." + x))) {
    if(beklemeSuresi.has(message.author.id+1)) return;
    if(!client.kullanabilir(message.author.id) &&  !message.member.roles.cache.has(sunucuAyar.boosterRolu)) return message.channel.send('`Renk Rolleri Taglı Üyelerimize Özeldir.`').then(x => x.delete({timeout: 10000}));
    message.member.roles.add(client.renkrolleri[message.content.toLowerCase().substring(1)]);
    message.react(client.emojiler.onay)
    beklemeSuresi.add(message.author.id+1);
    setTimeout(() => { beklemeSuresi.delete(message.author.id+1); }, 1000*60*30*1);
    return;
}
  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0].slice(conf.prefix.length);
  let bot = message.client;
  let ayar = sunucuAyar;
  let cmd = commands.get(command) || commands.get(aliases.get(command));
  if (cmd) {
    if (message.member.roles.cache.has(sunucuAyar.jailRolu) || sunucuAyar.teyitsizRolleri.some(rol => message.member.roles.cache.has(rol))) return;
    let permLevel = cmd.configuration.permLevel;
    if (permLevel == 1 && !message.member.roles.cache.has(sunucuAyar.sahipRolu) && message.author.id !== message.guild.ownerID && !conf.sahip.some(x => message.author.id === x)) return message.react("❌");
    if (permLevel == 2 && !message.member.hasPermission("ADMINISTRATOR")) return message.react("❌");
    cmd.execute(bot, message, args, ayar, client.emojiler);
  };
});

client.renk = {
  renksiz:"2F3136",

 // acikturkuaz: "#1abc9c",
   //koyuturkuaz: "#16a085",
  // acikyesil: "#2ecc71",
   //koyuyesil: "#27ae60",
   //acikmavi: "#3498db",
   //koyumavi: "#2980b9",
   //acikmor: "#9b59b6",
   //koyumor: "#8e44ad",
   //sari: "#f1c40f",
   //turuncu: "#f39c12",
   //acikturuncu: "#e67e22",
   //acikkirmizi: "#e74c3c",
   //koyukirmizi: "#c0392b",
   //beyaz: "#ecf0f1"
};

client.randomColor = function () {
  return client.renk[Object.keys(client.renk).random()];
};



client.on("message",async message => {
  
   if (message.channel.type === "dm") return;
   if (message.author.id === "818516812647628840") return;
  if (message.author.id === "235088799074484224") return;  
  

 // if (message.channel.id === "612620863887376405") return;

  if(message.author.bot && message.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g)){
    message.delete()
  message.reply("Reklam Yapmamalısın!")
  }
if(message.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g)&& !message.member.hasPermission('ADMINISTRATOR')) {
  message.delete()
    message.reply("Reklam Yapmamalısın!")
}
})

client.on("messageUpdate", function(oldMessage, newMessage){
  if(newMessage.author.bot || newMessage.channel.type === "dm") return;
     if (newMessage.author.id === "818516812647628840") return;
  if (newMessage.author.id === "235088799074484224") return;
  //if (newMessage.channel.id === "612620863887376405") return;
   if(newMessage.author.bot && newMessage.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) &&!newMessage.member.hasPermission('ADMINISTRATOR')){
    newMessage.delete()
 newMessage.reply("Reklam Yapmamalısın!")
  }
if(!newMessage.member.hasPermission('ADMINISTRATOR') && newMessage.content.toLowerCase().match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g)) {
  
 newMessage.delete()
    newMessage.reply("Reklam Yapmamalısın!")
}
});



let kufurler = ["allahoc","allahoç","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","oc","abaza","abazan","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","ass","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","cenabet","cibiliyetsiz","cibilliyetini","cibilliyetsiz","cif","cikar","cim","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","godumun","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","meme","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f","yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zibidi","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
client.chatKoruma = mesajIcerik => {
  if (!mesajIcerik) return;
    let inv = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+discord. gg)?/i;  
    if (inv.test(mesajIcerik)) return true;

    let link = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;  
    if (link.test(mesajIcerik)) return true;

       if ((kufurler).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(mesajIcerik))) return true;

  
    if ((kufurler).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(mesajIcerik))) return true;
  return false;
};

client.cezaNumara = async function () {
  var cezaNo = await Penalty.countDocuments({ sunucuID: sunucuAyar.sunucuID });
  return cezaNo;
};

client.splitEmbedWithDesc = async function(description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i*2048, (i+1)*2048)
    let x = new MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
   // if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if(value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};

Date.prototype.toTurkishFormatDate = function () {
  return moment.tz(this, "Europe/Istanbul").format('LLL');
};

client.convertDuration = (date) => {
  return moment.duration(date).format('H [saat,] m [dakika]');
};

client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};

client.wait = async function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
};

const webhooks = {};
global.getWebhook = (id) => webhooks[id];
global.send = async (channel, content, options) => {
    if (webhooks[channel.id]) return (await webhooks[channel.id].send(content, options));

    let webhookss = await channel.fetchWebhooks();
    let wh = webhookss.find(e => e.name == client.user.username),
        result;
    if (!wh) {
        wh = await channel.createWebhook(client.user.username, {
          avatar: client.user.avatarURL()
        });
        webhooks[channel.id] = wh;
        result = await wh.send(content, options);
    } else {
        webhooks[channel.id] = wh;
        result = await wh.send(content, options);
    }
    return result;
};

global.reply = async (message, content, options) => {
  let channel = message.channel;
  if (webhooks[channel.id]) return (await webhooks[channel.id].send(`${message.author}, ${content}`, options));

  let webhookss = await channel.fetchWebhooks();
  let wh = webhookss.find(e => e.name == client.user.username),
      result;
  if (!wh) {
      wh = await channel.createWebhook(client.user.username, {
          avatar: client.user.avatarURL()
      });
      webhooks[channel.id] = wh;
      result = await wh.send(`${message.author} ${content}`, options);
  } else {
      webhooks[channel.id] = wh;
      result = await wh.send(`${message.author} ${content}`, options);
  }
  return result;
};




const { sahip, token ,prefix, guildID, botVoiceChannelID, inviteChannelID, durum } = require('./ayarlar.json');
const guildInvites = new Map();

client.on("ready", async () => {
 client.user.setActivity(sunucuAyar.durum);
    console.log("Bot aktif!");
  let botVoiceChannel = client.channels.cache.get(botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(invites => guildInvites.set(guild.id, invites)).catch(err => console.log(err));
  });
});    
client.on("inviteCreate", async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on("inviteDelete", invite => setTimeout(async () => { guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()); }, 5000));
const Database = require('./Models/inviter.js');
client.on("guildMemberAdd", async member => {
  let cachedInvites = guildInvites.get(member.guild.id);
  let newInvites = await member.guild.fetchInvites();
  let usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses) || cachedInvites.find(inv => !newInvites.has(inv.code)) || {code: member.guild.vanityURLCode, uses: null, inviter: {id: null}};
  let inviter = client.users.cache.get(usedInvite.inviter.id) || {id: member.guild.id};
  let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7*24*60*60*1000;
  let inviteChannel = client.channels.cache.get(inviteChannelID);
  Database.findOne({ guildID: member.guild.id, userID: member.id }, (err, joinedMember) => {
    if (!joinedMember) {
      let newJoinedMember = new Database({
          _id: new mongoose.Types.ObjectId(),
          guildID: member.guild.id,
          userID: member.id,
          inviterID: inviter.id,
          regular: 0,
          bonus: 0,
          fake: 0
      });
      newJoinedMember.save();
    } else {
      joinedMember.inviterID = inviter.id;
      joinedMember.save();
    };
  });
  if (isMemberFake) {
    Database.findOne({ guildID: member.guild.id, userID: inviter.id }, (err, inviterData) => {
      if (!inviterData) {
        let newInviter = new Database({
          _id: new mongoose.Types.ObjectId(),
          guildID: member.guild.id,
          userID: inviter.id,
          inviterID: null,
          regular: 0,
          bonus: 0,
          fake: 1
        });
        newInviter.save().then(x => {
          if (inviteChannel) inviteChannel.send(`**${member} adlı üye sunucuya katıldı Davet eden: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} ${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)} daveti oldu** ⛔`).catch(err => {});
        });
      } else {
        inviterData.fake++
        inviterData.save().then(x => {
          if (inviteChannel) inviteChannel.send(`**${member} katıldı! Davet eden**: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} ${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)}. daveti oldu** ⛔`).catch(err => {});
     
        
        
        });
      };
    });
  } else {
    Database.findOne({ guildID: member.guild.id, userID: inviter.id }, (err, inviterData) => {
        if (!inviterData) {
          let newInviter = new Database({
            _id: new mongoose.Types.ObjectId(),
            guildID: member.guild.id,
            userID: inviter.id,
            inviterID: null,
            regular: 1,
            bonus: 0,
            fake: 0
          });
          newInviter.save().then(x => {
            if (inviteChannel) inviteChannel.send(`**${member} adlı üye sunucuya katıldı Davet eden: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} ${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)}.daveti oldu** ☑️`).catch(err => {});
     
        
          });
        } else {
          inviterData.regular++;
          inviterData.save().then(x => {
            if (inviteChannel) inviteChannel.send(`**${member} adlı üye sunucuya katıldı Davet eden: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} ${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)}.daveti oldu** ☑️`).catch(err => {});
     
          
          
          
          });
        };
      });
  };
  guildInvites.set(member.guild.id, newInvites);
});

client.on("guildMemberRemove", async member => {
  let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7*24*60*60*1000;
  let inviteChannel = client.channels.cache.get(inviteChannelID);
  Database.findOne({ guildID: member.guild.id, userID: member.id }, async (err, memberData) => {
    if (memberData && memberData.inviterID) {
      let inviter = client.users.cache.get(memberData.inviterID) || {id: member.guild.id};
      Database.findOne({ guildID: member.guild.id, userID: memberData.inviterID }, async (err, inviterData) => {
        if (!inviterData) {
         let newInviter = new Database({
            _id: new mongoose.Types.ObjectId(),
            guildID: member.guild.id,
            userID: inviter.id,
            inviterID: null,
            regular: 0,
            bonus: 0,
            fake: 0
          });
          newInviter.save();
        } else {
          if (isMemberFake) {
            if (inviterData.fake-1 >= 0) inviterData.fake--;
          } else {
            if (inviterData.regular-1 >= 0) inviterData.regular--;
          };
          inviterData.save().then(x => {
            if (inviteChannel) inviteChannel.send(`**${member} \`${member.user.id}\` ayrıldı ${inviter.tag ? `Davet eden: ${inviter.id == member.guild.id ? member.guild.name : inviter.tag} (${(x.regular ? x.regular : 0)+(x.bonus ? x.bonus : 0)} davet)` : `Davetçi bulunamadı!`}** ♿`).catch(err => {});
          });
        };
      });
    } else {
      if (inviteChannel) inviteChannel.send(`**${member} \`${member.user.id}\` ayrıldı! Davetçi bulunamadı!** ♿`).catch(err => {});
    };
  });
});

client.on("message", async message => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(sahip.length);

  if (command === "eval" && message.author.id === sahip) {
    if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
    let code = args.join(' ');

    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Yasaklı komut").replace(client.token, "Yasaklı komut");
      message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
  };

  if (command === "davet" || command === "invite" || command === "invites") {
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let embed = new MessageEmbed().setAuthor(uye.displayName, uye.user.displayAvatarURL({dynamic: true})).setColor("BLACK")
    Database.findOne({guildID: message.guild.id, userID: uye.id}, (err, inviterData) => {
      if (!inviterData) {
        embed.setDescription(`Davet bilgileri bulunmamaktadır!`);
        message.channel.send(embed);
      } else {
        Database.find({guildID: message.guild.id, inviterID: uye.id}).sort().exec((err, inviterMembers) => {
          let dailyInvites = 0;
          if (inviterMembers.length) {
            dailyInvites = inviterMembers.filter(x => message.guild.members.cache.has(x.userID) && (Date.now() - message.guild.members.cache.get(x.userID).joinedTimestamp) < 1000*60*60*24).length;
          };
          embed.setDescription(`Toplam **${inviterData.regular+inviterData.bonus}** davete sahip! (**${inviterData.regular}** gerçek, **${inviterData.bonus}** bonus, **${inviterData.fake}** fake, **${dailyInvites}** günlük)`);
          message.channel.send(embed);
        });
      };
    });
  };

  if (command === "bonus") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let uye = message.mentions.members.first () || message.guild.members.cache.get(args[0]);
    let sayi = args[1];
    if (!uye || !sayi) return message.reply(`Geçerli bir üye ve sayı belirtmelisin! (${sahip}bonus @üye +10/-10)`);
    Database.findOne({guildID: message.guild.id, userID: uye.id}, (err, inviterData) => {
      if (!inviterData) {
        let newInviter = new Database({
          _id: new mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          userID: uye.id,
          inviterID: null,
          regular: 0,
          bonus: sayi,
          fake: 0
        });
        newInviter.save().then(x => message.reply(`Belirtilen üyenin bonus daveti **${sayi}** olarak ayarlandı!`));
      } else {
        eval(`inviterData.bonus = inviterData.bonus+${Number(sayi)}`);
        inviterData.save().then(x => message.reply(`Belirtilen üyenin bonus davetine **${sayi}** eklendi!`));
      };
    });
  };

  if (command === "üyeler" || command === "members") {
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let embed = new MessageEmbed().setColor(uye.displayHexColor).setAuthor(uye.displayName + " Üyeleri", uye.user.displayAvatarURL({dynamic: true})).setFooter(message.member.displayName + " tarafından istendi!", message.author.displayAvatarURL({dynamic: true})).setThumbnail();
    let currentPage = 1;
    Database.find({guildID: message.guild.id, inviterID: uye.id}).sort([["descending"]]).exec(async (err, pageArray) => {
      pageArray = pageArray.filter(x => message.guild.members.cache.has(x.userID));
      if (err) console.log(err);
      if (!pageArray.length) {
        Database.findOne({guildID: message.guild.id, userID: uye.id}, async (err, uyeData) => {
          if (!uyeData) uyeData = {inviterID: null};
          let inviterUye = client.users.cache.get(uyeData.inviterID) || {id: message.guild.id};
          message.channel.send(embed.setDescription(`${uye} üyesini davet eden: ${inviterUye.id == message.guild.id ? message.guild.name : inviterUye.toString()}\n\nDavet ettiği üye bulunamadı!`));
        });
      } else {
        let pages = pageArray.chunk(10);
        if (!pages.length || !pages[currentPage - 1].length) return message.channel.send("Davet ettiği üye bulunamadı!");
        let msg = await message.channel.send(embed);
        let reactions = ["◀", "❌", "▶"];
        for (let reaction of reactions) await msg.react(reaction);
        Database.findOne({guildID: message.guild.id, userID: uye.id}, async (err, uyeData) => {
          let inviterUye = client.users.cache.get(uyeData.inviterID) || {id: message.guild.id};
          if (msg) await msg.edit(embed.setDescription(`${uye} üyesini davet eden: ${inviterUye.id == message.guild.id ? message.guild.name : inviterUye.toString()}\n\n${pages[currentPage - 1].map((kisi, index) => { let kisiUye = message.guild.members.cache.get(kisi.userID); return `\`${index+1}.\` ${kisiUye.toString()} | ${client.tarihHesapla(kisiUye.joinedAt)}`; }).join('\n')}`).setFooter(`Şu anki sayfa: ${currentPage}`)).catch(err => {});
        });
        const back = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "◀" && user.id == message.author.id,
              { time: 20000 }),
            x = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id, 
              { time: 20000 }),
            go = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "▶" && user.id == message.author.id,
              { time: 20000 });
          back.on("collect", async reaction => {
            await reaction.users.remove(message.author.id).catch(err => {});
            if (currentPage == 1) return;
            currentPage--;
            if (msg) msg.edit(embed.setDescription(`${pages[currentPage - 1].map((kisi, index) => { let kisiUye = message.guild.members.cache.get(kisi.userID); return `\`${index+1}.\` ${kisiUye.toString()} | ${client.tarihHesapla(kisiUye.joinedAt)}`; }).join('\n')}`).setFooter(`Şu anki sayfa: ${currentPage}`)).catch(err => {});
          });
          go.on("collect", async reaction => {
            await reaction.users.remove(message.author.id).catch(err => {});
            if (currentPage == pages.length) return;
            currentPage++;
            if (msg) msg.edit(embed.setDescription(`${pages[currentPage - 1].map((kisi, index) => { let kisiUye = message.guild.members.cache.get(kisi.userID); return `\`${index+1}.\` ${kisiUye.toString()} | ${client.tarihHesapla(kisiUye.joinedAt)}`; }).join('\n')}`).setFooter(`Şu anki sayfa: ${currentPage}`));
          });
          x.on("collect", async reaction => {
            await back.stop();
            await go.stop();
            await x.stop();
            if (message) message.delete().catch(err => {});
            if (msg) return msg.delete().catch(err => {});
          });
          back.on("end", async () => {
            await back.stop();
            await go.stop();
            await x.stop();
            if (message) message.delete().catch(err => {});
            if (msg) return msg.delete().catch(err => {});
          });
      };
    });
  };

  if (command === "toplist" || command === "sıralama") {
    let embed = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor("Davet Sıralaması", message.guild.iconURL({dynamic: true})).setFooter(message.member.displayName + " tarafından istendi!", message.author.displayAvatarURL({dynamic: true})).setThumbnail();
    let currentPage = 1;
    Database.find({guildID: message.guild.id}).sort().exec(async (err, pageArray) => {
      pageArray = pageArray.filter(x => message.guild.members.cache.has(x.userID)).sort((uye1, uye2) => ((uye2.regular ? uye2.regular : 0)+(uye2.bonus ? uye2.bonus : 0))-((uye1.regular ? uye1.regular : 0)+(uye1.bonus ? uye1.bonus : 0)));
      if (err) console.log(err);
      if (!pageArray.length) {
        message.channel.send(embed.setDescription("Davet verisi bulunamadı!"));
      } else {
        let pages = pageArray.chunk(10);
        if (!pages.length || !pages[currentPage - 1].length) return message.channel.send("Daveti olan üye bulunamadı!");
        let msg = await message.channel.send(embed);
        let reactions = ["◀", "❌", "▶"];
        for (let reaction of reactions) await msg.react(reaction);
        if (msg) await msg.edit(embed.setDescription(`${pages[currentPage - 1].map((kisi, index) => `\`${index+1}.\` ${message.guild.members.cache.get(kisi.userID).toString()} | **${kisi.regular+kisi.bonus}** davet Toplam **${kisi.regular+kisi.bonus}** davete sahip! (**${kisi.regular}** gerçek, **${kisi.bonus}** bonus, **${kisi.fake}** fake,)`).join('\n')}`).setFooter(`Şu anki sayfa: ${currentPage}`));
        const back = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "◀" && user.id == message.author.id,
              { time: 20000 }),
            x = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id, 
              { time: 20000 }),
            go = msg.createReactionCollector((reaction, user) => reaction.emoji.name == "▶" && user.id == message.author.id,
              { time: 20000 });
          back.on("collect", async reaction => {
          await reaction.users.remove(message.author.id).catch(err => {});
          if (currentPage == 1) return;
            currentPage--;
            if (msg) msg.edit(embed.setDescription(`${pages[currentPage - 1].map((kisi, index) => `\`${index+1}.\` ${message.guild.members.cache.get(kisi.userID).toString()} | **${kisi.regular+kisi.bonus}** davet Toplam **${kisi.regular+kisi.bonus}** davete sahip! (**${kisi.regular}** gerçek, **${kisi.bonus}** bonus, **${kisi.fake}** fake,)`).join('\n')}`).setFooter(`Şu anki sayfa: ${currentPage}`));
          });
          go.on("collect", async reaction => {
            await reaction.users.remove(message.author.id).catch(err => {});
              if (currentPage == pages.length) return;
              currentPage++;
              if (msg) msg.edit(embed.setDescription(`${pages[currentPage - 1].map((kisi, index) => `\`${index+1}.\` ${message.guild.members.cache.get(kisi.userID).toString()} | **${kisi.regular+kisi.bonus}** davet Toplam **${kisi.regular+kisi.bonus}** davete sahip! (**${kisi.regular}** gerçek, **${kisi.bonus}** bonus, **${kisi.fake}** fake,)`).join('\n')}`).setFooter(`Şu anki sayfa: ${currentPage}`));
          });
          x.on("collect", async reaction => {
            await back.stop();
            await go.stop();
            await x.stop();
            if (message) message.delete().catch(err => {});
            if (msg) return msg.delete().catch(err => {});
          });
          back.on("end", async () => {
            await back.stop();
            await go.stop();
            await x.stop();
            if (message) message.delete().catch(err => {});
            if (msg) return msg.delete().catch(err => {});
          });
      };
    });
  };
});
client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};

Array.prototype.chunk = function(chunk_size) {
  let myArray = Array.from(this);
  let tempArray = [];
  for (let index = 0; index < myArray.length; index += chunk_size) {
    let chunk = myArray.slice(index, index + chunk_size);
    tempArray.push(chunk);
  }
  return tempArray;
};








client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
   var Attachment = (message.attachments)
  if (Attachment){
     if(Attachment.array()[0]!==undefined) return
       
     
  }
  
  let sChannel2 = message.guild.channels.cache.get("822730160787685398")
    if(!sChannel2) return
  const embed = new MessageEmbed()
  .setColor("#ff0003")
  .setTitle("Mesaj Silindi")
  .setDescription(`${message.author} (\`${message.author.tag} - ${message.author.id}\`) üyesi tarafından <#${message.channel.id}> kanalından gönderilen mesaj silindi
  \`•\` **Mesaj İçeriği** ${message.content}`)
  .setThumbnail(message.author.avatarURL())
    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL()}`)
  sChannel2.send(embed);
 
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.cache.get("822730211892264980")
  if (oldMessage.content == newMessage.content) return;
  if(!sChannel3) return
  let embed = new MessageEmbed()
  .setTitle("Mesaj Düzenlendi")
  .setDescription(`${newMessage.author} (\`${newMessage.author.tag} - ${newMessage.author.id}\`) üyesi tarafından <#${newMessage.channel.id}> kanalından gönderilen mesaj düzenlendi
 \`•\` **Mesaj İçeriği** : \`${oldMessage.content} Yeni Mesaj ${newMessage.content} \``)
  
  .setThumbnail(newMessage.author.avatarURL())
    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL()}`)
  sChannel3.send(embed)
});
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  

  let sChannel3 = message.guild.channels.cache.get("822730232229265419")
    if(!sChannel3) return

 var Attachment = (message.attachments)
  if (Attachment){
   if(Attachment.array()[0]!==undefined){

       let embed = new MessageEmbed()
  .setColor("#ff0003")
  .setAuthor(`Foto Log `, message.author.avatarURL())
  .addField("**Kullanıcı**", message.author.tag,true)
  .addField("**Kanal Adı**", message.channel.name,true)
  .setImage(Attachment.array()[0].proxyURL)

    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL()}`)
  sChannel3.send(embed)
   // sChannel3.send(message.author ,new Discord.MessageAttachment(Attachment.array()[0].proxyURL))
   // sChannel3.send("----------------------------------------------------")
   }
  }
});




client.login(conf.token).then(x => console.log(`Bot ${client.user.tag} olarak giriş yaptı!`)).catch(err => console.error(`Bot ${client.user.tag} giriş yapamadı | Hata: ${err}`));
