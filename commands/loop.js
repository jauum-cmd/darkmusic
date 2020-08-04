const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`Você não está em um canal de voz ${emotes.error}`);

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`Sem música tocando neste servidor ${emotes.error}`);

    //Repeat mode
    const repeatMode = client.player.getQueue(message.guild.id).repeatMode;

    //If the mode is enabled
    if(repeatMode) {

        client.player.setRepeatMode(message.guild.id, false);

        //Message
        return message.channel.send(`Modo de repetição desativado ${emotes.success}`);

    //If the mode is disabled
    } else {

        client.player.setRepeatMode(message.guild.id, true);

        //Message
        return message.channel.send(`Modo de repetição ativado ${emotes.success}`);

    }
    
}
