const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`Você não está em um canal de voz ${emotes.error}`);

    //Get song
    const song = await client.player.resume(message.guild.id);

    //If there's no music
    if(!song) return message.channel.send(`Nenhuma música sendo reproduzida no momento ${emotes.error}`);

    //Message
    message.channel.send(`Música ${song.name} Retomada ${emotes.success}`);

}
