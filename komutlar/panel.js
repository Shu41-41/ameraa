const { MessageEmbed } = require('discord.js');
const Member = require('../Models/Member.js');
const MemberStats = require('../Models/MemberStats.js');
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args) => {
    if(!conf.sahip.includes(message.author.id))
        if((message.guild.ownerID != message.author.id)) return;
    let secim = args[0];
    const embed = new MessageEmbed().setColor(client.randomColor()).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }));
    if (secim === 'sıfırla') {
        if (!args[1] || (args[1] !== 'ses' && args[1] !== 'chat' && args[1] !== 'teyit')) return message.channel.send( embed.setDescription('Sıfırlanacak veriyi belirtmelisin! (ses/chat/teyit)')).then(x => x.delete({timeout: 5000}));
        if (args[1] === 'ses') {
            let newData = new Map();
            await MemberStats.updateMany({ guildID: message.guild.id }, { voiceStats: newData });
        }

        if (args[1] === 'chat') {
            let newData = new Map();
            await MemberStats.updateMany({ guildID: message.guild.id }, { chatStats: newData });
        }

        if (args[1] === 'teyit') {
            Member.find({guildID: message.guild.id}).exec((err, data) => {
                data.forEach(member => {
                    if (member.yetkili && (member.yetkili.has('erkekTeyit') || member.yetkili.has('kizTeyit'))) {
                        member.yetkili.set('erkekTeyit', 0);
                        member.yetkili.set('kizTeyit', 0);
                        member.save();
                    }
                });
            });
        }
        return message.channel.send(embed.setDescription('Başarıyla belirtilen istatistik verileri sıfırlandı!'));
    }
    if (!secim) return message.channel.send(embed.setDescription('Ses, chat veya teyit istatistiklerini sıfırlamak istiyorsan **sıfırla ses/chat/teyit** bir ayar yapmak istiyorsan aşağıdaki seçimleri kullanmalısın.'));
};

module.exports.configuration = {
    name: 'panel',
    aliases: ['ayar','ayarlar'],
    usage: 'panel [seçim] [ayar]',
    description: 'Sunucu ayarları.',
    permLevel: 0
};