const { MessageEmbed } = require('discord.js');

module.exports.execute = async (client, message, args, ayar, emoji) => {
	const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(client.randomColor());
	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	if (!client.kullanabilir(message.author.id) && !ayar.teyitciRolleri.some(r => message.member.roles.cache.has(r))) return message.react(emoji.iptal);
	if (!member) return message.channel.send(embed.setDescription('Geçerli bir üye belirtmelisin!')).then(x => x.delete({ timeout: 5000 }));
	if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send( embed.setDescription('Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!')).then(x => x.delete({ timeout: 5000 }));


	args = args.filter(a => a !== '' && a !== ' ').splice(1);
	const name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', 'İ').toUpperCase() + arg.slice(1)).join(' ');
	let displayName;
	const age = args.filter(arg => !isNaN(arg))[0] || undefined;
	if (!name || !age) return message.channel.send(embed.setDescription('Geçerli bir isim ve yaş belirtmelisin!')).then(x => x.delete({ timeout: 5000 }));
	displayName = `${member.user.username.includes(ayar.tag) ? ayar.tag : ayar.ikinciTag} ${name} | ${age}`;
  member.setNickname(displayName);

 message.channel.send( embed.setDescription(`${member.toString()} kişisinin ismi "${displayName.slice(2)}" olarak değiştirildi.`)).then((x) => x.delete({ timeout: 5000 }));
};

module.exports.configuration = {
	name: 'düzelt',
	aliases: ['isim','name', 'nick'],
	usage: 'düzelt [üye] [isim] [yaş]',
	description: 'Belirtilen üyenin ismini değiştirir.',
	permLevel: 0
};
