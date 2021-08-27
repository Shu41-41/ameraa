const { MessageEmbed } = require('discord.js');

module.exports.execute = (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomColor());
    if(!client.kullanabilir(message.author.id)) return message.channel.send(embed.setDescription('Bu komutu kullanabilmek için gerekli rollere sahip değilsin!')).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!uye) return message.channel.send( embed.setDescription('Geçerli bir üye belirtmelisin!')).then(x => x.delete({ timeout: 5000 }));
    if (!uye.voice.channelID) return message.channel.send( embed.setDescription(`${uye} üyesi herhangi bir ses kanalında değil!`)).then(x => x.delete({ timeout: 10000 }));
    message.channel.send(embed.setDescription(`${uye} üyesi şu anda \`${uye.voice.channel.name}\` ses kanalında bulunuyor!`)).then(x => x.delete({ timeout: 10000 }));
};

module.exports.configuration = {
    name: 'ses',
    aliases: ['ses-kanalı'],
    usage: 'ses @üye',
    description: 'Belirtilen üyenin ses kanalında olup olmadığını söyler.',
    permLevel: 0
};