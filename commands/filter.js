const emotes = require ("../config/emojis.json");
const filters = require("../config/filters.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`Sem música tocando neste servidor ${emotes.error}`);

    //Filter
    const filter = args[0];
    if(!filter) return message.channel.send(`Por favor, especifique um filtro válido para ativar ou desativar ${emotes.error}`);

    const filterToUpdate = Object.values(filters).find((f) => f.toLowerCase() === filter.toLowerCase());

    //If he can't find the filter
    if(!filterToUpdate) return message.channel.send(`Este filtro não existe ${emotes.error}`);

    const filterRealName = Object.keys(filters).find((f) => filters[f] === filterToUpdate);

    const queueFilters = client.player.getQueue(message.guild.id).filters
    const filtersUpdated = {};
    filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
    client.player.setFilters(message.guild.id, filtersUpdated);

    if(filtersUpdated[filterRealName]) {

        //The bot adds the filter on the music
        message.channel.send(`Estou adicionando o filtro à música, por favor, espere... Nota : quanto mais tempo a música estiver, mais tempo será a espera ${emotes.music}`);

    } else {

        //The bot removes the filter from the music
        message.channel.send(`Estou desativando o filtro na música, por favor, espere... Nota : quanto mais tempo a música estiver tocando, mais tempo a espera será ${emotes.music}`);

    }

}
