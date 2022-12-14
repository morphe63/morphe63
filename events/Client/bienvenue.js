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
            .setDescription(`Bonjour <@${member.id}> Bienvenue Γ  toi sur **${member.guild.name}**, πππ’π  π‘π ππππ π πππ  ππππ ππ‘ π£ππππππ ππ #γπγππΜπππππππ‘π \n afin d'avoir accΓ¨ss a tout le serveur ππ‘ πβπππ ππ π‘ππ  #γπ­γππΜπππ  .\n ππ’ ππ  ππ πππ π ππππππ‘πΜ πΜππππππππ‘ ππ πππΜππ π’π #γπγππππππ‘π  ππππ ππ πππ’π  ππππππ‘ππ π'βππ π‘ππππ ππ π‘ππ ππππ πππππππ . !`)
            .addFields (
                {name: "γπγ RΓ©glement", value: `<#${config.ReglementID}>`, inline: true},
                {name: "γπ­γ Roles", value: `<#${config.RolesID}>`, inline: true},
                {name: "γπγ Ticket", value: `<#${config.TicketsID}>`, inline: true}
            )
            
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo })

            client.channels.cache.get(bienvenue).send({ embeds: [BVN] });
        });
    }
}