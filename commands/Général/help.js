const { MessageEmbed } = require('discord.js');
const config = require('../../config.js');

exports.help = {
    name:"help"
}

exports.run = async (client, message, args) => {
    const HELP = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('**Commandes**')
        .addFields(
            { name: 'Général', value: '`help :` Liste des commandes du bot,\n `ping :`,\n `userinfo`'},
            { name: 'Modération', value: '`*ban`'},
            { name: 'Outils', value: '`*config`'},
            { name: 'Ticket', value: '`*add`, `close`, `rename`, `ticket`'},
        )
        .setTimestamp()
        .setFooter({ text: config.client.name, iconURL: config.client.logo})

    message.delete({ timeout: 100})
    message.channel.send({ embeds: [HELP] });
        }