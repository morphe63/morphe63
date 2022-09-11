const { Client, Intents, Collection, InteractionType, ReactionUserManager, Collector } = require('discord.js');
const client = new Client({ intents: [3276799] });
const config = require('./config');
const fs = require('fs');
const mysql = require('mysql');
client.commands = new Collection();

 

// Connexion DB
const db = new mysql.createConnection({
    host: config.BDD.host,
    password: config.BDD.password,
    user: config.BDD.user,
    database: config.BDD.database
});

db.connect(function (err) {
    if(err) throw err;

    console.log(`Connection à la database ${config.BDD.database} réussi !`)
})
  

// Command Handler
const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)

    console.log(`La commandes ${file} est chargée avec succès !`)
    client.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`La commandes ${file} est chargée avec succès depuis ${folder} !`)
        client.commands.set(props.help.name, props)
    }
      }
  
)


// Event Handler
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
        console.log(`L'event ${file} a été chargé avec succès`)
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
        console.log(`L'event ${file} a été chargé avec succès`)
    }
}

const eventSubFolders = fs.readdirSync('./events/').filter(f => !f.endsWith('.js'))
eventSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./events/${folder}/`).filter(f => f.endsWith('.js'))
    
    for (const file of commandFiles) {
        const event = require(`./events/${folder}/${file}`)
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
            console.log(`L'event ${file} as été chargé avec succès depuis ${folder}`)
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
            console.log(`L'event ${file} as été chargé avec succès depuis ${folder}`)
        }
    }
})

// Bot sur plusieur serveur
client.on("guildCreate", guild => {
    db.query(`SELECT * FROM guilds WHERE guildId = "${guild.id}"`, (err, req) => {
        if(!req.length) {
            db.query(`INSERT INTO guilds(guildId, guildOwnerId) VALUES ("${guild.id}", "${guild.ownerId}")`)
        }
    })
    db.query(`SELECT * FROM guildconfigurable WHERE guildId = "${guild.id}"`, (err, req) => {
        if(!req.length) {
            db.query(`INSERT INTO guildconfigurable (guildId) VALUES ("${guild.id}")`)
        }
    })
    db.query(`SELECT * FROM ticket WHERE guildId = "${guild.id}"`, (err, req) => {
        if(!req.length) {
            db.query(`INSERT INTO ticket(guildId, guildOwnerId) VALUES ("${guild.id}", "${guild.ownerId}")`)
        }
    })
});
    


client.login(config.token)