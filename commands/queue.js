const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`Você não está em um canal de voz ${emotes.error}`);

    //Get queue
    const queue = client.player.getQueue(message.guild.id);

    //If there's no music
    if(!queue) return message.channel.send(`Nenhuma música sendo reproduzida no momento ${emotes.error}`);

    //Message
    message.channel.send(`**Fila do servidor ${emotes.queue}**\nAtual - ${queue.playing.name} | ${queue.playing.author}\n`+
    (
        queue.tracks.map((track, i) => {
            return `#${i+1} - ${track.name} | ${track.author}`
        }).join('\n')
    ));

}
