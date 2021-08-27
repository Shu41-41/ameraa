const { client, sunucuAyar, conf } = global;
const { talentPerms } = sunucuAyar;
const { prefix } = conf;
client.komutlar = talentPerms;

module.exports = (message) => {
    const args = message.content.split(' ').slice(1);
    const command = message.content.split(' ')[0].slice(prefix.length);
    const komut = client.komutlar.find(k => k.isim === command);

    if (message.author.bot || (!message.guild && message.channel.type === 'dm') && !message.content.startsWith(prefix)) return;
    if (!komut) return;
	 const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return;
    if(!client.kullanabilir(message.author.id) && !komut.kullanabilir.some(x => message.member.roles.cache.has(x) || message.author.id === x)) return;
    if (komut.rol.some(x => uye.roles.cache.has(x))) komut.rol.some(x => uye.roles.remove(x).then(() => message.react(client.emojiler.onay)).catch(console.error));
    else uye.roles.add(komut.rol).then(() => message.react(client.emojiler.onay)).catch(console.error);
    return;
};

module.exports.configuration = {
    name: 'message'
};