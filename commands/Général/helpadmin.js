const { MessageEmbed } = require('discord.js');
const config = require('../../config.js');

exports.help = {
    name:"helpAd"
}

exports.run = async (client, message, args) => {
    const HELPAD = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('**Commandes**')
        .addFields(
            { name: 'Général', value: '`* help * :`\n *Liste des commandes du bot*'},
            { name: 'Information', value: '`* ping * :`\n `* userinfo * :`\n `* stats * :`'},
            { name: 'Modération', value: '`* ban * :`\n `* tempban * :`\n `* kick * :`\n `* mute * :`\n `* unmute * :`'},
            { name: 'Outils', value: '`* config * :`\n `* clear * :`'},
            { name: 'Ticket', value: '`* add * :`\n `* close * :`\n `* rename * :`\n `* ticket * :`'},
        )
        .setTimestamp()
        .setFooter({ text: config.client.name, iconURL: config.client.logo})

    message.delete({ timeout: 100})
    message.channel.send({ embeds: [HELPAD] });
        }