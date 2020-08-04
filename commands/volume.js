const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`Você não está em um canal de voz ${emotes.error}`);

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`Nenhuma música sendo reproduzida neste servidor ${emotes.error}`);

    //Args
    if(!args[0]) return message.channel.send(`Por favor, coloque um numero ${emotes.error}`);

    //Security modification
    if(isNaN(args[0])) return message.channel.send(`Por favor insira um número válido ${emotes.error}`);
    if(100 < args[0])  return message.channel.send(`Por favor insira um número válido ${emotes.error}`)
    if(args[0] <=0) return message.channel.send(`Por favor insira um número válido ${emotes.error}`)

    //Cannot put (-), (+), (,) or (.)
    if(message.content.includes("-")) return message.channel.send(`Por favor insira um número válido ${emotes.error}`)
    if(message.content.includes("+")) return message.channel.send(`Por favor insira um número válido ${emotes.error}`)
    if(message.content.includes(",")) return message.channel.send(`Por favor insira um número válido ${emotes.error}`)
    if(message.content.includes(".")) return message.channel.send(`Por favor insira um número válido ${emotes.error}`)

    //Set volume
    client.player.setVolume(message.guild.id, parseInt(args.join(" ")));

    //Message
    message.channel.send(`Volume definido como \`${args.join(" ")}\` ${emotes.success}`);

}
