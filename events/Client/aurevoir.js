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
    name: 'guildMemberRemove',
    execute(member, client) {
        db.query(`SELECT * FROM guildconfigurable WHERE guildId = "${member.guild.id}"`, (err, req) => {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            const quit = req[0].quit;

            if(quit == null) return;
            
            const QUIT = new MessageEmbed()
            .setColor(randomColor)
            .setTitle('Aurevoir')
            .setDescription(`<@${member.id}> Nous a quitté !`)
            .setTimestamp()
            .setFooter({ text: config.client.name, iconURL: config.client.logo })

            client.channels.cache.get(quit).send({ embeds: [QUIT] });
        });
    }
}