const config = require('../../config.js');
const mysql = require('mysql');
const { MessageEmbed } = require('discord.js');


// Connexion DB
const db = new mysql.createConnection({
    host: config.BDD.host,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});


module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        db.query(`SELECT * FROM guildconfigurable WHERE guildId = "${member.guild.id}"`, (err, req) => {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            const bienvenue = req[0].bienvenue;

            if(bienvenue == null) return;
            
            const BVN = new MessageEmbed()
            .setColor(randomColor)
            .setTitle('Bienvenue')
            .setDescription(`Bonjour <@${member.id}> Bienvenue Ã  toi sur **${member.guild.name}**, 𝑁𝑜𝑢𝑠 𝑡𝑒 𝑙𝑎𝑖𝑠𝑠𝑜𝑛𝑠 𝑙𝑖𝑟𝑒 𝑒𝑡 𝑣𝑎𝑙𝑖𝑑𝑒𝑟 𝑙𝑒 #【📜】𝑅𝑒̀𝑔𝑙𝑒𝑚𝑒𝑛𝑡𝑠\n afin d'avoir accèss a tout le serveur 𝑒𝑡 𝑐ℎ𝑜𝑖𝑠𝑖𝑟 𝑡𝑒𝑠 #【🎭】𝑅𝑜̂𝑙𝑒𝑠 .\n 𝑇𝑢 𝑎𝑠 𝑙𝑎 𝑝𝑜𝑠𝑠𝑖𝑏𝑖𝑙𝑖𝑡𝑒́ 𝑒́𝑔𝑎𝑙𝑒𝑚𝑒𝑛𝑡 𝑑𝑒 𝑐𝑟𝑒́𝑒𝑟 𝑢𝑛 #【📝】𝑇𝑖𝑐𝑘𝑒𝑡𝑠 𝑎𝑓𝑖𝑛 𝑑𝑒 𝑛𝑜𝑢𝑠 𝑟𝑎𝑐𝑜𝑛𝑡𝑒𝑟 𝑙'ℎ𝑖𝑠𝑡𝑜𝑖𝑟𝑒 𝑑𝑒 𝑡𝑜𝑛 𝑝𝑒𝑟𝑠𝑜𝑛𝑛𝑎𝑔𝑒𝑠. !`)
            .addFields (
                {name: "【📜】 Réglement", value: `<#${config.ReglementID}>`, inline: true},
                {name: "【🎭】 Roles", value: `<#${config.RolesID}>`, inline: true},
                {name: "【📝】 Ticket", value: `<#${config.TicketsID}>`, inline: true}
            )
            
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo })

            client.channels.cache.get(bienvenue).send({ embeds: [BVN] });
        });
    }
}