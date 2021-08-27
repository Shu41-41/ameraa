/* eslint-disable linebreak-style */
const { MessageEmbed } = require('discord.js');
const Database = require('../Models/Member.js');
const { prefix } = global.conf;
const Member = require('../Models/Member.js');

module.exports.execute = async (client, message, args, conf, emoji) => {
	const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(client.randomColor());
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	if (!client.kullanabilir(message.author.id) && !conf.teyitciRolleri.some(r => message.member.roles.cache.has(r))) return message.react(emoji.iptal);
	if (!member) return message.channel.send( embed.setDescription('Geçerli bir üye belirtmelisin!')).then(x => x.delete({ timeout: 5000 }));
  if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription('Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!')).then(x => x.delete({ timeout: 5000 }));
       //   if (!member.roles.cache.some(r => [conf.boosterRolu ,conf.vipRole].includes(r.id)) && !member.user.username.includes(`${conf.tag}`)) return message.channel.send(new MessageEmbed() .setDescription(`${client.emoji("iptal")} Sunucumuz şuanda taglı alımdadır.Giriş yapabilmek için \`boost\` basabilir ya da tagımızı alarak (\`${conf.tag}\`) içeriye erişim sağlayabilirsiniz.`).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor("BLACK"));

  args = args.filter(a => a !== '' && a !== ' ').splice(1);
	const name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', 'İ').toUpperCase() + arg.slice(1)).join(' ');
	let displayName;
	const age = args.filter(arg => !isNaN(arg))[0] || undefined;
	if (!name || !age) return message.channel.send(embed.setDescription('Geçerli bir isim ve yaş belirtmelisin!')).then(x => x.delete({timeout: 5000}));
	displayName = `${member.user.username.includes(conf.tag) ? conf.tag : conf.ikinciTag} ${name} | ${age}`;
	member.setNickname(displayName);

	const memberData = await Database.findOne({ userID: member.id }) || {};
	const historyData = memberData.history || [];
 
  
  
	let msg = await message.channel.send(
		embed.setFooter(`'${prefix}isimler @üye' yaparak kullanıcının eski isimlerine bakabilirsiniz.`).setDescription(historyData.length > 0 ? [
            `Bu Kullanıcının Sunucudaki Eski İsimleri [**${historyData.length}**]`,
			`${historyData.map((x) => `\`${x.name}\` (<@&${x.role}>)`).join('\n')}\n`,
		] : `${member.toString()} kişisinin ismi "${displayName.slice(2)}" olarak değiştirildi.`)); 

		
    await msg.react(emoji.erkek);
    await msg.react(emoji.kiz);
    const filter = (reaction, user) => {
        return [emoji.erkek, emoji.kiz].includes(reaction.emoji.id) && user.id === message.author.id;
	};
	const collector = msg.createReactionCollector(filter, { max: 1, time: 30000, error: [ 'time' ] });
	let nickRole, roles;
	collector.on('collect', async (reaction) => {
		if (reaction.emoji.id == emoji.erkek) {
			if(conf.kizRolleri.some(x => member.roles.cache.has(x))) await member.roles.remove(conf.kizRolleri).catch(() => { return undefined; }) 
			if(member.roles.cache.has(conf.boosterRolu)) roles = conf.erkekRolleri.concat(conf.boosterRolu);
			else roles = conf.erkekRolleri;
			member.setNickname(displayName);
			await member.roles.set(roles).catch(() => { return undefined; });
			await member.roles.set(roles).catch(() => { return undefined; });
			msg.edit(embed.setDescription(`${client.emoji("onay")} ${member.toString()} kişisi başarıyla erkek olarak kaydedildi.`));
     client.channels.cache.get(conf.kayıtlog).send(embed.setDescription(`${member.toString()} kişisi başarıyla erkek olarak kaydedildi.`));
	        if (conf.teyitsizRolleri.some(r => member.roles.cache.has(r))) staffInit(message.author.id, message.guild.id, 'erkekTeyit');
			nickRole = { name: displayName, role: conf.erkekRolleri[0] };
			historyData.push(nickRole);
		nameInit(member, historyData, message.guild.id);
		let yetkiliBilgi = new Map();
		yetkiliBilgi.set("erkekTeyit", 1);
		let authorData = await Member.findOne({ guildID: message.guild.id, userID: message.author.id });
		  if (!authorData) {
			let newMember = new Member({
			  guildID: message.guild.id,
			  userID: message.author.id,
			  afk: {},
			  yetkili: yetkiliBilgi
			});
			newMember.save();
		  } else {
			let oncekiTeyit = authorData.yetkili.get("erkekTeyit") || 0;
			authorData.yetkili.set("erkekTeyit", Number(oncekiTeyit)+1);
			authorData.save();
		  };
		} else if (reaction.emoji.id == emoji.kiz) {
            if(conf.erkekRolleri.some(x => member.roles.cache.has(x))) await member.roles.remove(conf.erkekRolleri).catch(() => { return undefined; }); 
			if(member.roles.cache.has(conf.boosterRolu)) roles = conf.kizRolleri.concat(conf.boosterRolu);
			else roles = conf.kizRolleri;
			member.setNickname(displayName);
			await member.roles.set(roles).catch(() => { return undefined; });
			await member.roles.set(roles).catch(() => { return undefined; });
			msg.edit(embed.setDescription(`${client.emoji("onay")} ${member.toString()} kişisi başarıyla kadın olarak kaydedildi.`));
     client.channels.cache.get(conf.kayıtlog).send(embed.setDescription(`${member.toString()} kişisi başarıyla kadın olarak kaydedildi.`));
			if (conf.teyitsizRolleri.some(r => member.roles.cache.has(r))) staffInit(message.author.id, message.guild.id, 'kizTeyit');
			nickRole = { name: displayName, role: conf.kizRolleri[0] };
			historyData.push(nickRole);
			nameInit(member, historyData, message.guild.id);
			let yetkiliBilgi = new Map();
			yetkiliBilgi.set("kizTeyit", 1);
			let authorData = await Member.findOne({ guildID: message.guild.id, userID: message.author.id });
			  if (!authorData) {
				let newMember = new Member({
				  guildID: message.guild.id,
				  userID: message.author.id,
				  afk: {},
				  yetkili: yetkiliBilgi
				});
				newMember.save();
			  } else {
				let oncekiTeyit = authorData.yetkili.get("kizTeyit") || 0;
				authorData.yetkili.set("kizTeyit", Number(oncekiTeyit)+1);
				authorData.save();
			  };
	
		}		

	});
    
    collector.on('end', async () => {
		if (member.user.username.includes(conf.tag)) 
		await member.roles.add(conf.ekipRolu).catch(() => { return undefined; });
        msg.reactions.removeAll();
           client.channels.cache.get(conf.chatKanali).send(embed.setDescription(`${member.toString()} \`Aramıza hoş geldiniz! Rol seçim odalarından rolleriniz almayı unutmayın iyi eğlenceler.\``)).then(x => x.delete({timeout: 30000}));
    });
	collector.on('error', () => msg.delete({ timeout: 30000 }));
};

module.exports.configuration = {
	name: 'kayıt',
	aliases: ['name', 'nick','e','k','register'],
	usage: 'kayıt [üye] [isim] [yaş]',
	description: 'Belirtilen üyeyi sunucuya kaydeder veya sadece ismini değiştirir.',
  Kategori: "Kayıt Komutları",
	permLevel: 0
};

async function nameInit(member, historyData, guild) {
	if (await Database.findOne({ userID: member.id })) return await Database.updateOne({ userID: member.id}, { history: historyData }).exec();
	else {
		const newMemberData = new Database({
			guildID: guild,
			userID: member.user.id,
			afk: {},
			history: historyData,
			yetkili: new Map()
		});
		return newMemberData.save();
	}
}

async function staffInit(authorID, guild, teyit) {
	let yetkiliBilgi = new Map();
	yetkiliBilgi.set(teyit, 1);
	let authorData = await Database.findOne({ guildID: guild, userID: authorID });
	if (!authorData) {
		let newMember = new Database({
			guildID: guild,
			userID: authorID,
			afk: {},
			history: [],
			yetkili: yetkiliBilgi
		});
		newMember.save();
	} else {
		let oncekiTeyit = authorData.yetkili.get(teyit) || 0;
		authorData.yetkili.set(teyit, Number(oncekiTeyit) + 1);
		authorData.save();
	}
}
