const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`Você não está em um canal de voz ${emotes.error}`);

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`Nenhuma música sendo reproduzida neste servidor ${emotes.error}`);

    client.player.shuffle(message.guild.id);

    //Message
    return message.channel.send(`Aleatório da fila ${emotes.success}`);
    
}
