const config = require ("../config/bot.json");
const emotes = require ("../config/emojis.json");
const filters = require ("../config/filters.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`Você não está em um canal de voz ${emotes.error}`);

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`Nenhuma música sendo reproduzida neste servidor ${emotes.error}`);

    //Emojis
    const enabledEmoji = emotes.success;
    const disabledEmoji = emotes.error;

    const filtersStatuses = [ [], [] ];

    Object.keys(filters).forEach((filterName) => {
        const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
        array.push(filters[filterName] + " : " + (client.player.getQueue(message.guild.id).filters[filterName] ? enabledEmoji : disabledEmoji));
    });

    //List embed
    const list = new Discord.MessageEmbed()
    .setDescription(`Lista de todos os filtros ativados ou desativados.\nPara adicionar um filtro a uma \`${config.prefix}filter\` música.`)
    .addField("**Filtros**", filtersStatuses[0].join('\n'), true)
    .addField("** **", filtersStatuses[1].join('\n'), true)
    .setColor("BLACK");

    //Message
    message.channel.send(list);

}
