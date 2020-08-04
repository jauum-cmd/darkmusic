const config = require(`../config/bot.json`)

module.exports = async (client) => {

    //If the bot is ready it sends a message in the console
    console.log(`Bot ligado em ${client.guilds.cache.size} servidores, para um total de ${client.users.cache.size} usuários`);

    //Musica para
    client.user.setActivity(config.streaming)

}
