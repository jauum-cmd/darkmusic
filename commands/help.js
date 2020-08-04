const config = require ("../config/bot.json");
const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //New embed
    const help = new Discord.MessageEmbed()
    .setDescription("Encontre a lista de comandos disponíveis neste painel.")
    .addField("**Musica**", "`play`, `pause`, `resume`, `queue`, `clear-queue`, `shuffle`, `np`, `loop`, `volume`, `skip`, `stop`")
    .addField("**Filtros**", "`bassboost`, `tremolo`, `vibrato`, `treble`, `8D`, `normalizer`, `surrounding`, `nightcore`, `vaporwave`, `superequalizer`, `phaser`, `reverse`, `pulsator`")
    .addField("**Informações**", "`ping`")
    .setFooter(`Para usar filtros, ${config.prefix}filtro (o filtro). Exemplo: ${config.prefix}filter 8D.`)
    .setColor("BLACK")

    //Message
    message.channel.send(help)

}
