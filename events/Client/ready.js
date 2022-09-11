const config = require('../../config.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client, message) {
           // Login message
           const botready = new MessageEmbed()
           .setColor('BLUE')
           .setTitle('**Redémarrage**')
           .setDescription(`✅ - Redémarrage effectué avec succès !`)
           .setTimestamp()
           .setFooter({ text: config.client.name, iconURL: config.client.logo})

        console.log(`Connectés à ${client.user.username}`)
        console.log(`Le bot est utilisé sur ${client.guilds.cache.size} serveurs !`)
        
        client.channels.cache.get(`1010221231921967176`).send({embeds:[botready],}) 
        
        // Presence
        client.user.setPresence({ activities: [{ name: config.client.activity, type: 'WATCHING' }] })
    }
}

