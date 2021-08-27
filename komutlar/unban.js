const { MessageEmbed } = require('discord.js');

module.exports.execute = async (client, message, args, ayar) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('GREEN');
    if(!client.kullanabilir(message.author.id)) return message.channel.send(embed.setDescription('Bu komutu kullanabilmek için gerekli rollere sahip değilsin!')).then(x => x.delete({timeout: 5000}));
    if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription('Geçerli bir kişi ID\'si belirtmelisin!')).then(x => x.delete({timeout: 5000}));
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
        message.guild.members.unban(kisi.id).catch(() => message.channel.send(embed.setDescription('Belirtilen ID numarasına sahip bir ban bulunamadı!')).then(x => x.delete({timeout: 5000})));
        message.react(client.emojiler.onay).catch(() => {
            return undefined;
        });
    if(ayar.banLogKanali && client.channels.cache.has(ayar.banLogKanali)) client.channels.cache.get(ayar.banLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setTimestamp().setFooter(ayar.durum).setTitle('Ban Kaldırıldı!').setDescription(`**Kaldıran Yetkili:** ${message.author} (${message.author.id})\n**Banı Kaldırılan Üye:** ${kisi.tag} (${kisi.id})`));
    } else {
        message.channel.send( embed.setDescription('Geçerli bir kişi ID\'si belirtmelisin!')).then(x => x.delete({timeout: 5000}));
    }
};
module.exports.configuration = {
    name: 'unban',
    aliases: ["yasak-kaldır"],
    usage: 'unban [id] [isterseniz sebep]',
    description: 'Belirtilen kişinin banını kaldırır.',
    permLevel: 0
};